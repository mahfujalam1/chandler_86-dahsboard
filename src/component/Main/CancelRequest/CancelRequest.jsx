import { useState, useMemo } from "react";
import {
  Card,
  Table,
  Avatar,
  Space,
  Dropdown,
  Button,
  Input,
  Tag,
  Modal,
  message,
} from "antd";
import {
  DownOutlined,
  DollarCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  useGetAllRefundsQuery,
  useAcceptRefundMutation,
  useRejectRefundMutation,
} from "../../../redux/features/refunds/refund";
import { toast } from "sonner";

const formatDateTime = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
};

export default function CancelRequest() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rejectModal, setRejectModal] = useState({ open: false, record: null });
  const [rejectNote, setRejectNote] = useState("");

  const { data, isLoading } = useGetAllRefundsQuery({
    page,
    limit,
  });

  const [acceptRefund, { isLoading: isAccepting }] = useAcceptRefundMutation();
  const [rejectRefund, { isLoading: isRejecting }] = useRejectRefundMutation();

  const refunds = data?.data?.refunds ?? [];
  const totalRefunds = data?.data?.total ?? 0;

  const tableData = useMemo(() => {
    return refunds?.map((refund, idx) => ({
      key: refund.id || idx,
      id: refund.id,
      sNo: `#${(page - 1) * limit + (idx + 1)}`,
      coach: {
        name: refund?.coach?.fullName ?? "—",
        sport: refund?.coach?.sport ?? "—",
        avatar: refund?.coach?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${refund?.coach?.avatar}`
          : undefined,
      },
      player: {
        name: refund?.player_name ?? "—",
        avatar: refund?.avatar
          ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${refund?.avatar}`
          : undefined,
      },
      date: formatDateTime(refund?.submitted_at),
      title: refund?.session_title ?? "—",
      refund: refund?.refund_amount ?? 0,
      notes: refund?.reason ?? "—",
      status: refund?.status ?? "Pending",
      rejectionNote: refund?.rejection_note,
    }));
  }, [refunds, page, limit]);

  const handleTableChange = (pagination) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
  };

  const handleApprove = async (record) => {
    console.log("approve",record)
    try {
      await acceptRefund(record.id).unwrap();
      message.success("Refund approved successfully!");
    } catch (error) {
      message.error(error?.data?.message || "Failed to approve refund");
    }
  };

  const handleRejectClick = (record) => {
    setRejectModal({ open: true, record });
    setRejectNote("");
  };

  const handleRejectSubmit = async () => {
    if (!rejectNote.trim()) {
      message.error("Please provide a rejection reason");
      return;
    }

    try {
      await rejectRefund({
        requestId: rejectModal.record.id,
        note: rejectNote,
      }).unwrap();
      toast.success("Refund rejected successfully!");
      setRejectModal({ open: false, record: null });
      setRejectNote("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject refund");
    }
  };

  const handleAction = (key, record) => {
    console.log("action",record);
    if (key === "refund") {
      handleApprove(record);
    }
    if (key === "reject") {
      handleRejectClick(record);
    }
  };

  const columns = [
    {
      title: "S. No",
      dataIndex: "sNo",
      key: "sNo",
      width: 100,
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    {
      title: "Coach name",
      key: "coach",
      render: (_, r) => (
        <Space>
          <Avatar src={r.coach.avatar} size={36}>
            {(r.coach.name?.[0] ?? "?").toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{r.coach.name}</div>
            <div style={{ fontSize: 12, color: "#8c8c8c" }}>
              {r.coach.sport}
            </div>
          </div>
        </Space>
      ),
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
    {
      title: "Player name",
      key: "player",
      render: (_, r) => (
        <Space>
          <Avatar src={r.player.avatar} size={36}>
            {(r.player.name?.[0] ?? "?").toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{r.player.name}</div>
          </div>
        </Space>
      ),
      responsive: ["sm", "md", "lg", "xl", "xxl"],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      responsive: ["md", "lg", "xl", "xxl"],
    },
    {
      title: "Session Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      responsive: ["md", "lg", "xl", "xxl"],
    },
    
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const colors = {
          Pending: "orange",
          Approved: "green",
          Rejected: "red",
        };
        return (
          <Tag
            color={colors[status] || "default"}
            style={{ borderRadius: 999 }}
          >
            {status}
          </Tag>
        );
      },
      responsive: ["lg", "xl", "xxl"],
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      ellipsis: true,
      responsive: ["lg", "xl", "xxl"],
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        const items = [
          {
            key: "refund",
            icon: <DollarCircleOutlined />,
            label: "Approve Refund",
            disabled: record.status !== "Pending",
          },
          { type: "divider" },
          {
            key: "reject",
            icon: <CloseCircleOutlined />,
            label: "Reject",
            danger: true,
            disabled: record.status !== "Pending",
          },
        ];
        const onClick = ({ key }) => handleAction(key, record);
        return (
          <Dropdown
            menu={{ items, onClick }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button>
              Action <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
      responsive: ["xs", "sm", "md", "lg", "xl", "xxl"],
    },
  ];

  return (
    <>
      <Card
        title="Refund Request"
        
        styles={{ body: { padding: 0 } }}
      >
        <Table
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isAccepting}
          pagination={{
            current: page,
            pageSize: limit,
            total: totalRefunds,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showLessItems: true,
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
          rowHoverable
        />
      </Card>

      {/* Reject Modal */}
      <Modal
        title="Reject Refund Request"
        open={rejectModal.open}
        onCancel={() => {
          setRejectModal({ open: false, record: null });
          setRejectNote("");
        }}
        onOk={handleRejectSubmit}
        okText="Submit"
        okButtonProps={{
          danger: true,
          loading: isRejecting,
          disabled: !rejectNote.trim(),
        }}
        cancelButtonProps={{ disabled: isRejecting }}
      >
        {rejectModal.record && (
          <div style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 8, fontWeight: 500 }}>
              Player: {rejectModal.record.player.name}
            </p>
            <p style={{ marginBottom: 8, fontWeight: 500 }}>
              Amount: ${rejectModal.record.refund}
            </p>
            <p style={{ marginBottom: 8, fontWeight: 500 }}>
              Reason for rejection:
            </p>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid #d9d9d9",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
              }}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
