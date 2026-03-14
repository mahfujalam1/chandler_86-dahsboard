import { useState } from "react";
import { Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NODE_TYPES, TYPE_CONFIG } from "../../../constant/treeConstants";
import AddChildModal from "../../ui/Modal/AddChildModal";
import UpdateNodeModal from "../../ui/Modal/UpdateNodeModal";
import ProductModal from "../../ui/Modal/ProductModal";


const TreeNode = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const [modal, setModal] = useState(null); // null | "addChild" | "edit" | "product"

  const cfg = TYPE_CONFIG[node.type] || {
    color: "#9ca3af",
    bg: "#f9fafb",
    border: "#e5e7eb",
    icon: "📦",
    label: node.type,
  };
  const hasKids = node.children?.length > 0;
  const isProduct = node.type === NODE_TYPES.PRODUCT;
  const isRoot = node.type === NODE_TYPES.ROOT;

  // Don't render the invisible ROOT node, just its children
  if (isRoot) {
    return (
      <div>
        {node.children?.map((child) => (
          <TreeNode key={child.id} node={child} depth={0} />
        ))}
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 6,
          marginBottom: 8,
        }}
      >
        {/* Expand / collapse toggle */}
        <div style={{ width: 22, flexShrink: 0, marginTop: 11 }}>
          {hasKids && (
            <button
              onClick={() => setExpanded((p) => !p)}
              style={{
                background: "#f3f4f6",
                border: "1px solid #e5e7eb",
                borderRadius: 4,
                color: "#6b7280",
                width: 22,
                height: 22,
                cursor: "pointer",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              {expanded ? "−" : "+"}
            </button>
          )}
        </div>

        {/* Node card */}
        <div
          onClick={() => setModal(isProduct ? "product" : "edit")}
          style={{
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            borderLeft: `3px solid ${cfg.color}`,
            borderRadius: 10,
            padding: "9px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            minWidth: 200,
            maxWidth: 300,
            transition: "box-shadow 0.15s, border-color 0.15s",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 2px 12px ${cfg.color}33`;
            e.currentTarget.style.borderColor = cfg.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.borderColor = cfg.border;
          }}
        >
          <span style={{ fontSize: 18, flexShrink: 0 }}>{cfg.icon}</span>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                fontSize: 13,
                color: "#1f2937",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {node.name || node.title}
            </div>
            <div
              style={{
                fontSize: 10,
                color: cfg.color,
                marginTop: 2,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {cfg.label}
            </div>
          </div>

          {/* Add child button — not for PRODUCT */}
          {!isProduct && (
            <Tooltip title="Add child node">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal("addChild");
                }}
                style={{
                  flexShrink: 0,
                  background: `${cfg.color}18`,
                  border: `1px solid ${cfg.color}55`,
                  borderRadius: 6,
                  color: cfg.color,
                  width: 26,
                  height: 26,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                  padding: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = `${cfg.color}33`)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = `${cfg.color}18`)
                }
              >
                <PlusOutlined style={{ fontSize: 12 }} />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Children */}
      {expanded && hasKids && (
        <div
          style={{
            marginLeft: 46,
            paddingLeft: 16,
            borderLeft: "1px dashed #d1d5db",
          }}
        >
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}

      {/* Modals */}
      {modal === "addChild" && (
        <AddChildModal open parentNode={node} onClose={() => setModal(null)} />
      )}
      {modal === "edit" && (
        <UpdateNodeModal open node={node} onClose={() => setModal(null)} />
      )}
      {modal === "product" && (
        <ProductModal open node={node} onClose={() => setModal(null)} />
      )}
    </div>
  );
};

export default TreeNode;
