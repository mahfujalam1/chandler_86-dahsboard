import { useState } from "react";
import { Table, Modal, ConfigProvider, Tag } from "antd";
import moment from "moment";
import { IoEyeSharp } from "react-icons/io5";

const Earnings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Updated mock data to match the design
  const mockData = [
    {
      id: "01",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-01T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=1",
    },
    {
      id: "02",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-02T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=2",
    },
    {
      id: "03",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-03T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=3",
    },
    {
      id: "04",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-04T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=4",
    },
    {
      id: "05",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-05T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=5",
    },
    {
      id: "06",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-06T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=6",
    },
    {
      id: "07",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-07T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=7",
    },
    {
      id: "08",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-08T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=8",
    },
    {
      id: "09",
      fullName: "Bashir",
      bankName: "Meghna Bank",
      accountType: "Savings",
      accountNumber: "999-888-666",
      withdrawAmount: 25,
      status: "Approved",
      createdAt: "2024-01-09T00:00:00Z",
      email: "bashir@gmail.com",
      phonNumber: "4567-7894",
      location: "Dhaka",
      avatarUrl: "https://i.pravatar.cc/50?img=9",
    },
  ];

  const dataSource = mockData.map((record, ) => ({
    key: record.id,
    id: record.id,
    fullName: record.fullName,
    bankName: record.bankName,
    accountType: record.accountType,
    accountNumber: record.accountNumber,
    withdrawAmount: `$${record.withdrawAmount}`,
    status: record.status,
    createdAt: record.createdAt,
    email: record.email,
    phonNumber: record.phonNumber,
    location: record.location,
    date: moment(record.createdAt).format("DD MMM, YYYY"),
    avatarUrl: record.avatarUrl,
  }));

  const columns = [
    {
      title: "#Sl",
      dataIndex: "id",
      key: "id",
      width: 60,
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
      width: 150,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img 
            src={record.avatarUrl} 
            alt={text}
            className="w-8 h-8 rounded-full"
          />
          <span>{text}</span>
        </div>
      ),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      width: 150,
      sorter: (a, b) => a.bankName.localeCompare(b.bankName),
    },
    {
      title: "A/C Type",
      dataIndex: "accountType",
      key: "accountType",
      width: 120,
      sorter: (a, b) => a.accountType.localeCompare(b.accountType),
    },
    {
      title: "A/C Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: 150,
      sorter: (a, b) => a.accountNumber.localeCompare(b.accountNumber),
    },
    {
      title: "Withdraw Amount",
      dataIndex: "withdrawAmount",
      key: "withdrawAmount",
      width: 150,
      sorter: (a, b) => parseFloat(a.withdrawAmount.replace('$', '')) - parseFloat(b.withdrawAmount.replace('$', '')),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag 
          color={status === 'Approved' ? 'green' : status === 'Pending' ? 'orange' : 'red'}
          style={{ 
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          {status}
        </Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => (
        <IoEyeSharp
          onClick={() => showModal(record)}
          style={{ 
            fontSize: "18px", 
            cursor: "pointer",
            color: "#FF8133"
          }}
        />
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <section className="">
      <div className="">
        <div className="md:flex justify-between items-center">
          <h1 className="text-2xl font-semibold flex items-center text-gray-800 p-2 mt-4">
            Earnings
          </h1>
        </div>
        
        <div className="">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#FF8133",
                  headerColor: "#ffffff",
                  headerBorderRadius: 8,
                  borderRadiusLG: 8,
                },
              },
            }}
          >
            <Table
              className="shadow-sm"
              dataSource={dataSource}
              columns={columns}
              pagination={{ 
                pageSize: 10, 
                position: ["bottomCenter"],
                showQuickJumper: true,
             
              }}
              scroll={{ x: "max-content" }}
              responsive={true}
              size="middle"
              style={{
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            />
          </ConfigProvider>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={isModalVisible}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={null}
        centered
        width={400}
        closable={true}
        style={{
          borderRadius: '16px'
        }}
        className="withdrawal-modal"
      >
        <div className="text-black">
          {selectedRecord && (
            <div className="p-0">
              {/* Header */}
              <div className="text-center py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  Withdrawal Request Details
                </h2>
              </div>

              {/* Content */}
              <div className="p-1 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Transaction ID</span>
                  <span className="text-gray-800 font-medium">#{selectedRecord.id}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">User name</span>
                  <span className="text-gray-800 font-medium">{selectedRecord.fullName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Bank name</span>
                  <span className="text-gray-800 font-medium">{selectedRecord.bankName}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">A/C Type</span>
                  <span className="text-gray-800 font-medium">{selectedRecord.accountType}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Date</span>
                  <span className="text-gray-800 font-medium">{selectedRecord.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">A/C Number</span>
                  <span className="text-gray-800 font-medium">{selectedRecord.accountNumber}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Withdraw Amount</span>
                  <span className="text-gray-800 font-semibold">{selectedRecord.withdrawAmount}</span>
                </div>

                {/* Amount Display */}
                <div className="bg-purple-50 rounded-lg p-4 text-center my-6">
                  <div className="text-2xl font-bold text-purple-800">
                    {selectedRecord.withdrawAmount}
                  </div>
                  <div className="text-sm text-purple-600 mt-1">
                    {selectedRecord.withdrawAmount} only
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={handleCancel}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3 px-4 bg-[#FF8133] text-white rounded-lg hover:bg-[#e6722d] transition-colors font-medium">
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </section>
  );
};

export default Earnings;
