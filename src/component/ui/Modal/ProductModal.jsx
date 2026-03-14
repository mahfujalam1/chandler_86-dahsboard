import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Upload,
  Popconfirm,
  message,
  Tag,
  Spin,
} from "antd";
import {
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  PlayCircleOutlined,
  PictureOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  useDeleteNodeMutation,
  useGetSingleNodeQuery,
  useUpdateNodeMutation,
  useUpdateProductInfoMutation,
} from "../../../redux/features/node/nodeApi";

// ─── helpers ──────────────────────────────────────────────────────────────────
const BASE_IMG = import.meta.env.VITE_BASE_IMAGE_URL;

// "uploads\\products\\file.pdf"  →  "http://server/uploads/products/file.pdf"
const toUrl = (path) => {
  if (!path) return null;
  return `${BASE_IMG}/${path.replace(/\\/g, "/")}`;
};

// ─── FileCard ─────────────────────────────────────────────────────────────────
const FILE_META = {
  brochure_file_url: {
    icon: <FilePdfOutlined style={{ fontSize: 22, color: "#ef4444" }} />,
    label: "Brochure",
  },
  video_file_url: {
    icon: <PlayCircleOutlined style={{ fontSize: 22, color: "#8b5cf6" }} />,
    label: "Video",
  },
  banner_image_url: {
    icon: <PictureOutlined style={{ fontSize: 22, color: "#3b82f6" }} />,
    label: "Banner",
  },
};

const FileCard = ({ fieldKey, value }) => {
  const { icon, label } = FILE_META[fieldKey];
  const url = toUrl(value);
  return (
    <div
      style={{
        background: "#f9fafb",
        border: `1px solid ${url ? "#bbf7d0" : "#e5e7eb"}`,
        borderRadius: 10,
        padding: "12px 8px",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: 6 }}>{icon}</div>
      <div
        style={{
          fontSize: 10,
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 11,
            color: "#16a34a",
            fontWeight: 600,
            textDecoration: "none",
            background: "#dcfce7",
            border: "1px solid #bbf7d0",
            borderRadius: 6,
            padding: "3px 10px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#bbf7d0")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#dcfce7")}
        >
          <EyeOutlined style={{ fontSize: 11 }} /> View
        </a>
      ) : (
        <span style={{ fontSize: 11, color: "#d1d5db" }}>Not uploaded</span>
      )}
    </div>
  );
};

// ─── ProductModal ──────────────────────────────────────────────────────────────
// Response shape from GET /nodes/:id:
// {
//   data: {
//     id, title, parent_id, type,
//     product_info: {
//       id,                   ← productInfoId  (used for PATCH /nodes/product-info/:id)
//       title, description,
//       brochure_file_url, video_file_url, banner_image_url
//     }
//   }
// }

const ProductModal = ({ open, onClose, node }) => {
  const [mode, setMode] = useState("view");
  const [form] = Form.useForm();

  const nodeId = node?.id;

  // GET /nodes/:id — fetch full product details
  const { data: res, isLoading: fetching } = useGetSingleNodeQuery(nodeId, {
    skip: !nodeId || !open,
  });

  // Unwrap response
  const detail = res?.data ?? {}; // node fields
  const productInfo = detail?.product_info ?? {}; // nested product_info
  const productInfoId = productInfo?.id; // used for updateProductInfo

  const [updateNode, { isLoading: updatingNode }] = useUpdateNodeMutation();
  const [updateProductInfo, { isLoading: updatingProduct }] =
    useUpdateProductInfoMutation();
  const [deleteNode, { isLoading: deleting }] = useDeleteNodeMutation();

  useEffect(() => {
    if (detail && productInfo && mode === "edit") {
      form.setFieldsValue({
        title: detail.title || "",
        description: productInfo.description || "",
      });
    }
  }, [detail, productInfo, mode, form]);

  const handleClose = () => {
    form.resetFields();
    setMode("view");
    onClose();
  };

  // ── SAVE ──────────────────────────────────────────────────────────────────
  const handleSave = async (values) => {
    try {
      // Call 1: update node title → PATCH /nodes/:nodeId
      await updateNode({
        id: nodeId,
        title: values.title,
        type: "PRODUCT",
      }).unwrap();

      // Call 2: update product info → PATCH /nodes/product-info/:productInfoId
      const fd = new FormData();
      if (values.description) fd.append("description", values.description);
      if (values.brochure_file?.[0]?.originFileObj)
        fd.append("brochure_file", values.brochure_file[0].originFileObj);
      if (values.video_file?.[0]?.originFileObj)
        fd.append("video_file", values.video_file[0].originFileObj);
      if (values.banner_image?.[0]?.originFileObj)
        fd.append("banner_image", values.banner_image[0].originFileObj);

      await updateProductInfo({ id: productInfoId, formData: fd }).unwrap();
      message.success("Product updated successfully!");
      setMode("view");
    } catch (err) {
      message.error(err?.data?.message || "Update failed");
    }
  };

  // ── DELETE ────────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    try {
      await deleteNode(nodeId).unwrap();
      message.success("Product deleted!");
      handleClose();
    } catch (err) {
      message.error(err?.data?.message || "Delete failed");
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);
  const uploadProps = { beforeUpload: () => false, maxCount: 1 };

  // ── VIEW MODE ─────────────────────────────────────────────────────────────
  if (mode === "view") {
    return (
      <Modal
        title={
          <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
            💊 Product Details
          </span>
        }
        open={open}
        onCancel={handleClose}
        footer={null}
        width={520}
        centered
      >
        {fetching ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Spin size="large" />
            <p style={{ marginTop: 12, color: "#9ca3af" }}>
              Loading details...
            </p>
          </div>
        ) : (
          <div style={{ padding: "12px 0" }}>
            {/* Title */}
            <div
              style={{
                background: "#f9fafb",
                borderRadius: 10,
                padding: "14px 16px",
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1f2937" }}>
                {detail.title}
              </div>
              <Tag color="green" style={{ marginTop: 6, borderRadius: 6 }}>
                Product
              </Tag>
            </div>

            {/* Description */}
            {productInfo?.description && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    marginBottom: 4,
                  }}
                >
                  Description
                </div>
                <div
                  style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}
                >
                  {productInfo.description}
                </div>
              </div>
            )}

            {/* Files */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: "0.7px",
                  marginBottom: 10,
                }}
              >
                Files
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <FileCard
                  fieldKey="brochure_file_url"
                  value={productInfo?.brochure_file_url}
                />
                <FileCard
                  fieldKey="video_file_url"
                  value={productInfo?.video_file_url}
                />
                <FileCard
                  fieldKey="banner_image_url"
                  value={productInfo?.banner_image_url}
                />
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <Button
                icon={<EditOutlined />}
                onClick={() => setMode("edit")}
                style={{
                  flex: 1,
                  borderRadius: 8,
                  height: 40,
                  borderColor: "#16a34a",
                  color: "#16a34a",
                }}
              >
                Edit Product
              </Button>
              <Popconfirm
                title="Delete Product"
                description={`Delete "${detail.title}"? This cannot be undone.`}
                onConfirm={handleDelete}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{
                  danger: true,
                  style: { borderRadius: 6, fontWeight: 600 },
                }}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  loading={deleting}
                  style={{ flex: 1, borderRadius: 8, height: 40 }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        )}
      </Modal>
    );
  }

  // ── EDIT MODE ─────────────────────────────────────────────────────────────
  return (
    <Modal
      title={
        <span style={{ fontSize: 16, fontWeight: 700, color: "#1f2937" }}>
          ✏️ Edit Product
        </span>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={520}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          label={<span style={{ fontWeight: 600 }}>Title</span>}
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input size="large" style={{ borderRadius: 8 }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ fontWeight: 600 }}>Description</span>}
          name="description"
        >
          <Input.TextArea rows={3} style={{ borderRadius: 8 }} />
        </Form.Item>

        {/* Brochure */}
        <Form.Item
          label={<span style={{ fontWeight: 600 }}>Brochure File</span>}
        >
          {productInfo?.brochure_file_url && (
            <a
              href={toUrl(productInfo.brochure_file_url)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: 12,
                color: "#3b82f6",
                marginBottom: 6,
              }}
            >
              📄 Current: view existing
            </a>
          )}
          <Form.Item
            name="brochure_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload {...uploadProps} accept=".pdf,.doc,.docx">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                {productInfo?.brochure_file_url
                  ? "Replace Brochure"
                  : "Upload Brochure"}
              </Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        {/* Video */}
        <Form.Item label={<span style={{ fontWeight: 600 }}>Video File</span>}>
          {productInfo?.video_file_url && (
            <a
              href={toUrl(productInfo.video_file_url)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: 12,
                color: "#3b82f6",
                marginBottom: 6,
              }}
            >
              🎬 Current: view existing
            </a>
          )}
          <Form.Item
            name="video_file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload {...uploadProps} accept="video/*">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                {productInfo?.video_file_url ? "Replace Video" : "Upload Video"}
              </Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        {/* Banner */}
        <Form.Item
          label={<span style={{ fontWeight: 600 }}>Banner Image</span>}
        >
          {productInfo?.banner_image_url && (
            <a
              href={toUrl(productInfo.banner_image_url)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                fontSize: 12,
                color: "#3b82f6",
                marginBottom: 6,
              }}
            >
              🖼️ Current: view existing
            </a>
          )}
          <Form.Item
            name="banner_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload {...uploadProps} accept="image/*">
              <Button
                icon={<UploadOutlined />}
                style={{ borderRadius: 8, width: "100%" }}
              >
                {productInfo?.banner_image_url
                  ? "Replace Banner"
                  : "Upload Banner"}
              </Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <Button
            onClick={() => setMode("view")}
            style={{ flex: 1, borderRadius: 8, height: 40 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={updatingNode || updatingProduct}
            style={{
              flex: 1,
              borderRadius: 8,
              height: 40,
              background: "#16a34a",
              border: "none",
              fontWeight: 600,
            }}
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductModal;
