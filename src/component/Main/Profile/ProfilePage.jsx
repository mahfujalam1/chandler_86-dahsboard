import React, { useState, useEffect } from "react";
import { Card, Input, Button, Avatar, message, Upload } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CameraOutlined,
} from "@ant-design/icons";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
} from "../../../redux/features/user/userApi";
import { useGetMeQuery } from "../../../redux/features/auth/authApi";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const { data, refetch } = useGetMeQuery();

  // Edit Profile State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const [updateUser, { isLoading: isUpdatingProfile }] =
    useUpdateUserMutation();

  // Set initial values when data loads
  useEffect(() => {
    if (data?.data) {
      setName(data.data.fullName || "");
      setEmail(data.data.email || "");
      setContactNo(data.data.phone || "");
    }
  }, [data]);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        message.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        message.error("Image size should be less than 5MB");
        return;
      }

      setAvatarFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      if (name !== data?.data?.fullName) {
        formData.append("fullName", name);
      }
      if (contactNo !== data?.data?.phone) {
        formData.append("phone", contactNo);
      }
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      // Check if there are any changes
      if (formData.entries().next().done) {
        message.info("No changes to save");
        return;
      }

      const response = await updateUser(formData).unwrap();

      if (response.success) {
        message.success("Profile updated successfully!");
        setAvatarFile(null);
        setAvatarPreview(null);
        refetch(); // Refresh user data
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to update profile");
    }
  };

  // Handle password change
  const handleChangePassword = async () => {
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      message.error("Please fill all password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      message.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      if (response.success) {
        message.success("Password changed successfully!");
        // Clear password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      message.error(error?.data?.message || "Failed to change password");
    }
  };

  const renderForm = () => {
    if (activeTab === "editProfile") {
      return (
        <div className="w-full max-w-md mx-auto">
          <h3 className="text-center mb-6 font-medium text-gray-700 text-lg">
            Edit Your Profile
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="large"
            />
            <Input
              placeholder="Email"
              value={email}
              readOnly
              onChange={(e) => setEmail(e.target.value)}
              size="large"
              type="email"
            />
            <Input
              placeholder="Contact No"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              size="large"
            />
            <Button
              type="primary"
              block
              loading={isUpdatingProfile}
              onClick={handleUpdateProfile}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                height: 40,
                fontWeight: 500,
              }}
            >
              Save & Change
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full max-w-md mx-auto">
          <h3 className="text-center mb-6 font-medium text-gray-700 text-lg">
            Change Password
          </h3>
          <div className="space-y-4">
            <Input.Password
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Button
              type="primary"
              block
              loading={isChangingPassword}
              onClick={handleChangePassword}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                height: 40,
                fontWeight: 500,
              }}
            >
              Save & Change
            </Button>
          </div>
        </div>
      );
    }
  };

  const currentAvatar =
    avatarPreview ||
    (data?.data?.avatar
      ? `${import.meta.env.VITE_BASE_IMAGE_URL}/${data.data.avatar}`
      : undefined);

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-2xl p-8 border-none shadow-none">
        <div className="flex flex-col items-center">
          {/* Avatar with upload functionality */}
          <div className="relative">
            <Avatar size={100} src={currentAvatar}>
              {data?.data?.fullName?.[0]?.toUpperCase()}
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors"
              style={{ cursor: "pointer" }}
            >
              <CameraOutlined />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>

          <h2 className="mt-3 text-xl font-semibold">{data?.data?.fullName}</h2>
          <p className="text-gray-500 text-sm">@{data?.data?.role}</p>

          {/* Tabs below image */}
          <div className="mt-6 flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("editProfile")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "editProfile"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("changePassword")}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === "changePassword"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Change Password
            </button>
          </div>

          <div className="mt-8 w-full">{renderForm()}</div>
        </div>
      </Card>
    </div>
  );
}
