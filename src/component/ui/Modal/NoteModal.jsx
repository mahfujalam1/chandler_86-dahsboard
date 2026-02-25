// NoteModal.jsx — Reusable component for warning/cancel/note actions
import { Modal, message } from "antd";
import { useState, useEffect } from "react";

export function NoteModal({
  open,
  record,
  onClose,
  onSubmit,
  title = "Add Note",
  placeholder = "Enter your note here...",
  okText = "Submit",
  okButtonProps = {},
  isLoading = false,
  noteLabel = "Note:",
  showRecordInfo = true,
  recordInfoRenderer = null,
}) {
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) {
      setNote("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!note.trim()) {
      message.error("Please enter a note");
      return;
    }
    onSubmit(note, record);
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={okText}
      okButtonProps={{
        loading: isLoading,
        disabled: !note.trim(),
        ...okButtonProps,
      }}
      cancelButtonProps={{ disabled: isLoading }}
      centered
    >
      {record && (
        <div style={{ marginTop: 16 }}>
          {/* Custom record info or default */}
          {showRecordInfo &&
            (recordInfoRenderer ? (
              recordInfoRenderer(record)
            ) : (
              <div
                style={{
                  marginBottom: 16,
                  padding: 12,
                  background: "#f5f5f5",
                  borderRadius: 6,
                }}
              >
                {record.coach?.name && (
                  <p style={{ margin: 0, marginBottom: 4 }}>
                    <strong>Coach:</strong> {record.coach.name}
                  </p>
                )}
                {record.player?.name && (
                  <p style={{ margin: 0, marginBottom: 4 }}>
                    <strong>Player:</strong> {record.player.name}
                  </p>
                )}
                {record.name && (
                  <p style={{ margin: 0, marginBottom: 4 }}>
                    <strong>Name:</strong> {record.name}
                  </p>
                )}
                {record.sessionType && (
                  <p style={{ margin: 0 }}>
                    <strong>Type:</strong> {record.sessionType}
                  </p>
                )}
              </div>
            ))}

          <p style={{ marginBottom: 8, fontWeight: 500 }}>{noteLabel}</p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={placeholder}
            rows={4}
            autoFocus
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
  );
}
