// PlatformFeeModal.jsx
import { useState } from "react";
import {
  useAddPlatformFeeMutation,
  useGetPlatformFeeQuery,
} from "../../../redux/features/dashboard/dashboardApi";
import { toast } from "sonner";

export default function PlatformFeeModal({ isOpen, onClose }) {
  const [addFee, { isLoading, isError, error }] = useAddPlatformFeeMutation();
  const { data } = useGetPlatformFeeQuery();
  const feeData = data?.data;
  const [amount, setAmount] = useState(0);

  const handleSave = async () => {
    if (amount) {
      try {
        const res = await addFee({ fee: parseFloat(amount) });
        if (res.error) {
          toast.error(res?.error?.data?.message || "Failed to add fee");
          return;
        }else if(res.data){
          toast.success("Platform fee added successfully");
        }
        setAmount("");
        onClose();
      } catch (err) {
        console.error("Error adding fee:", err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl mx-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {"Edit Platform Fee"}
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              defaultValue={feeData?.fee}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 font-medium text-white hover:bg-gray-800"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
