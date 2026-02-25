import { useState } from "react";
import { Card, Table, Tag, Button, Input } from "antd";
import {
  SearchOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { ReplyModal } from "../../ui/Modal/ReplyModal";
import { useGetAllReportsQuery } from "../../../redux/features/dashboard/dashboardApi";

export default function ReportTable() {
  const [query, setQuery] = useState("");
  const { data: reports, refetch } = useGetAllReportsQuery();
  const [replyModal, setReplyModal] = useState({ open: false, record: null });

  const handleSend = () => {
    refetch();
    setReplyModal({ open: false, record: null });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filtered = reports?.data?.reports?.filter((r) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      r.participant?.player?.fullName?.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.createdAt.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q)
    );
  });

  const tableData = filtered?.map((report) => ({
    key: report.id,
    id: report.id,
    name: report.participant?.player?.fullName || "N/A",
    description: report.description,
    time: formatDate(report.createdAt),
    status: report.status,
    reply: report.reply,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v, record) => (
        <Tag
          color={v === "Replied" ? "green" : "purple"}
          icon={<ArrowLeftOutlined />}
          style={{ borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}
          onClick={() => setReplyModal({ open: true, record })}
        >
          {v}
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="Report"
      extra={
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          allowClear
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          style={{ width: 320, background: "#f5f5f5", borderRadius: 999 }}
        />
      }
    >
      <Table columns={columns} dataSource={tableData} pagination={false} />

      {/* Reply Modal */}
      <ReplyModal
        open={replyModal.record?.status === "Pending" ? replyModal.open : false}
        record={replyModal.record}
        onClose={() => setReplyModal({ open: false, record: null })}
        onSend={handleSend}
      />
    </Card>
  );
}
