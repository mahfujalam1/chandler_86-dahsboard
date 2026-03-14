import { useState, useMemo } from "react";
import { Table, Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ReusableTable = ({
  columns = [],
  data = [],
  showSearch = true,
  isLoading,
  showPagination = true,
  pageSize,
  total, // server-side total count
  currentPage: externalPage, // server-side current page
  onPageChange, // server-side page change handler
  onSearch, // server-side search handler
  searchPlaceholder = "Search here...",
  searchKeys = [],
  rowKey = "key",
  headerLeft = null,
  headerRight = null,
  onRow,
}) => {
  const [searchText, setSearchText] = useState("");
  const [internalPage, setInternalPage] = useState(1);

  const isServerSide = !!onPageChange;
  const currentPage = isServerSide ? (externalPage ?? 1) : internalPage;

  // client-side filter (server-side হলে skip)
  const filteredData = useMemo(() => {
    if (isServerSide || !searchText.trim()) return data;

    const keys =
      searchKeys.length > 0
        ? searchKeys
        : Object.keys(data[0] || {}).filter(
            (k) =>
              typeof data[0][k] === "string" || typeof data[0][k] === "number",
          );

    return data.filter((row) =>
      keys.some((key) =>
        String(row[key] ?? "")
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      ),
    );
  }, [data, searchText, searchKeys, isServerSide]);

  // client-side pagination (server-side হলে data যেমন আছে তেমন)
  const paginatedData = useMemo(() => {
    if (!showPagination || isServerSide) return filteredData;
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize, showPagination, isServerSide]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchText(val);
    if (isServerSide) {
      onSearch?.(val);
      onPageChange?.(1);
    } else {
      setInternalPage(1);
    }
  };

  const handlePageChange = (page) => {
    if (isServerSide) {
      onPageChange(page);
    } else {
      setInternalPage(page);
    }
  };

  const paginationTotal = isServerSide ? (total ?? 0) : filteredData.length;

  return (
    <div className="w-full">
      {(headerLeft || headerRight || showSearch) && (
        <div className="table-header-wrap flex items-center justify-between mb-5 gap-3 flex-wrap">
          <div className="flex items-center gap-3">{headerLeft}</div>
          <div className="header-right flex items-center gap-3 flex-wrap">
            {headerRight}
            {showSearch && (
              <Input
                prefix={<SearchOutlined style={{ color: "#9ca3af" }} />}
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={handleSearch}
                className="custom-search-input"
                style={{
                  borderRadius: "999px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  width: 220,
                  minWidth: 160,
                }}
              />
            )}
          </div>
        </div>
      )}

      <div style={{ width: "100%", overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={paginatedData}
          rowKey={rowKey}
          isLoading={isLoading}
          pagination={false}
          onRow={onRow}
          className="custom-ant-table"
          style={{ fontFamily: "inherit", width: "100%" }}
          scroll={{ x: "max-content" }}
          tableLayout="auto"
        />
      </div>

      {showPagination && paginationTotal > pageSize && (
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            total={paginationTotal}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}

      <style>{`
        .custom-ant-table { width: 100% !important; }
        .custom-ant-table .ant-table { background: transparent; font-size: 14px; width: 100% !important; }
        .custom-ant-table .ant-table-container { width: 100% !important; }
        .custom-ant-table .ant-table-content { width: 100% !important; }
        .custom-ant-table table { width: 100% !important; table-layout: auto !important; }
        .custom-ant-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #374151;
          font-weight: 600;
          font-size: 13px;
          border-bottom: 1px solid #f0f0f0;
          padding: 10px 16px;
          white-space: nowrap;
        }
        .custom-ant-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f7f7f7;
          padding: 12px 16px;
          color: #374151;
          vertical-align: middle;
        }
        .custom-ant-table .ant-table-tbody > tr:hover > td { background: #fafafa !important; }
        .custom-ant-table .ant-table-tbody > tr:last-child > td { border-bottom: none; }
        .custom-ant-table .ant-table-ping-left .ant-table-cell-fix-left-last::after,
        .custom-ant-table .ant-table-ping-right .ant-table-cell-fix-right-first::after { box-shadow: none !important; }
        .custom-search-input .ant-input { background: transparent !important; }
        .custom-search-input:hover,
        .custom-search-input:focus-within {
          border-color: #f97316 !important;
          box-shadow: 0 0 0 2px rgba(249,115,22,0.1) !important;
        }
        @media (max-width: 640px) {
          .table-header-wrap { flex-direction: column !important; align-items: flex-start !important; }
          .table-header-wrap .header-right { width: 100%; justify-content: space-between; }
          .custom-search-input { width: 100% !important; }
        }
      `}</style>
    </div>
  );
};

export default ReusableTable;
