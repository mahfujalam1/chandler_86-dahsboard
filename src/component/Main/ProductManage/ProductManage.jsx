import { Spin, Alert, Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import TreeNode from "./TreeNode";
import { useGetNodeTreeQuery } from "../../../redux/features/node/nodeApi";
import { Empty } from "antd";

const ProductManage = () => {
  const {
    data: treeResponse,
    isLoading,
    isError,
    refetch,
  } = useGetNodeTreeQuery();

  const rootNode = treeResponse?.data || null;
  const hasNodes = rootNode?.children?.length > 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px 24px",
        minHeight: 400,
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "1px solid #f3f4f6",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#1f2937",
            }}
          >
            Product Tree
          </h2>
          <p
            style={{ margin: 0, fontSize: 13, color: "#9ca3af", marginTop: 2 }}
          >
            Manage body parts, surgeries and products
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* Legend */}
          <div style={{ display: "flex", gap: 14, marginRight: 8 }}>
            {[
              { color: "#f97316", label: "Body Part" },
              { color: "#8b5cf6", label: "Surgery" },
              { color: "#16a34a", label: "Product" },
            ].map(({ color, label }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  color: "#6b7280",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: color,
                    flexShrink: 0,
                  }}
                />
                {label}
              </div>
            ))}
          </div>

          {/* Reload — শুধু এটাই থাকবে */}
          <Button
            icon={<ReloadOutlined />}
            onClick={refetch}
            disabled={isLoading}
            style={{ borderRadius: 8, height: 38 }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <Spin size="large" />
          <p style={{ marginTop: 16, color: "#9ca3af" }}>Loading tree...</p>
        </div>
      ) : isError ? (
        <Alert
          type="error"
          message="Failed to load tree"
          description="Could not connect to the server."
          action={
            <Button size="small" danger onClick={refetch}>
              Retry
            </Button>
          }
          style={{ borderRadius: 10 }}
        />
      ) : !hasNodes ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span style={{ color: "#9ca3af" }}>No nodes yet.</span>}
        />
      ) : (
        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 40,
              alignItems: "flex-start",
            }}
          >
            {rootNode.children.map((child) => (
              <TreeNode key={child.id} node={child} depth={0} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManage;
