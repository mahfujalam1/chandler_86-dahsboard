// ReplyModal.jsx — separate component
import { Modal, Button, message } from "antd";
import { useState, useEffect } from "react";
import { useReplyReportMutation } from "../../../redux/features/dashboard/dashboardApi";

export function ReplyModal({ open, record, onClose, onSend }) {
  console.log(record)
  const [text, setText] = useState("");
  const [reply, { isLoading }] = useReplyReportMutation();

  useEffect(() => {
    // Pre-fill with existing reply if available
    if (record?.reply) {
      setText(record.reply);
    } else {
      setText("");
    }
  }, [record]);

  const handleSend = async () => {
    if (!text.trim()) {
      message.error("Please write a reply");
      return;
    }

    try {
      // Send reportId as param and reply in body
      await reply({
        reportId: record.id,
        body: { reply: text },
      }).unwrap();

      message.success("Reply sent successfully!");
      onSend(); // Callback to parent to refetch data
    } catch (error) {
      message.error(error?.data?.message || "Failed to send reply");
    }
  };

  return (
    <Modal
      title="Feedback Reply"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      {record && (
        <div className="space-y-4">
          <div>
            <p className="font-medium text-gray-700 mb-2">
              Feedback from: {record.name}
            </p>
            <div className="rounded-md border p-3 text-gray-700 bg-gray-50">
              {record.description}
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-2">Your Reply:</p>
            <textarea
              className="w-full rounded-md border p-3 text-gray-700"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your reply here..."
            />
          </div>

          <div className="text-center">
            <Button
              type="primary"
              onClick={handleSend}
              loading={isLoading}
              disabled={!text.trim()}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
