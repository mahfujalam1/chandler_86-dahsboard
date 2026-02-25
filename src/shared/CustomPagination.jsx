import { Pagination } from "antd";

export default function CustomPagination({
  current = 1,
  total = 0,
  pageSize = 10,
  onChange,
  showSizeChanger = true,
  pageSizeOptions = ["5", "10", "20", "50", "100"],
  showTotal = true,
  style = {},
  ...rest
}) {
  const itemRender = (page, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderTop: "1px solid #f0f0f0",
        ...style,
      }}
    >
      <Pagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        // showSizeChanger={showSizeChanger}
        pageSizeOptions={pageSizeOptions}
        showTotal={
          showTotal
            ? (total, range) => `${range[0]}-${range[1]} of ${total} items`
            : undefined
        }
        itemRender={itemRender}
        showLessItems
        {...rest}
      />
    </div>
  );
}
