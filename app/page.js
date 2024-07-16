"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import toast, { Toaster } from 'react-hot-toast';


export default function Home() {
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [role, setRole] = useState(undefined);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [editData, setEditData] = useState([]);
 

  const showCreateModal = () => {
    setCreateModal(true);
  };
  const closeCreateModal = () => {
    setCreateModal(false);
  };

  const showUpdateModal = (item) => {
    setEditData(item);
    setUpdateModal(true);
  };
  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const showDeleteModal = (item) => {
    setDeleteData(item);
    setDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const roleOptions = [
    "Administrator",
    "Sales Manager",
    "Sales Representative",
  ];

  const handleOptionSelect = (event) => {
    setRole(event.target.value);
  };

  const createUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `https://caf7193ed9bb0e76469f.free.beeceptor.com/api/users/`,
        {
          name: fullName,
          email: email,
          role: role,
          password: password,
        }
      );
      if (res.status == 200) {
        clearForm();
        closeCreateModal();
        toast.success('User Successfully Created');
        fetchUsers();
      }
      if (res.status == 429) {
        closeCreateModal();
      }
      setLoading(false);
    } catch (err) {
      toast.error(`Something went wrong ${err.message}`)
    }
  };

  const clearForm = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setRole(undefined);
  };

  const fetchUsers = async () => {
    try {
      setTableLoading(true);
      const res = await axios.get(
        `https://caf7193ed9bb0e76469f.free.beeceptor.com/api/users/`
      );
      setUserData(res.data);
      setTableLoading(false);
    } catch (err) {
      toast.error(`Something went wrong ${err.message}`)
    }
  };

  const updateUser = async () => {
    let editedName = "";
    let editedEmail = "";
    let editedRole = "";
    let editedPassword = "";

    if(fullName == ""){
      editedName = editData.name
    } else{
      editedName = fullName
    } 
    if(email == ""){
      editedEmail = editData.email
    } else{
      editedEmail = email
    } 
    if(role == ""){
      editedRole = editData.role
    } else{
      editedRole = role
    } 
    if(password == ""){
      editedPassword = editData.password
    } else{
      editedPassword = password
    } 
    try {
      setLoading(true);
      const res = await axios.put(
        `https://caf7193ed9bb0e76469f.free.beeceptor.com/api/users/${editData.id}`,
        {
          name: editedName,
          email: editedEmail,
          role: editedRole,
          password: editedPassword,
        }
      );
      if (res.status == 200) {
        clearForm();
        closeUpdateModal();
        toast.success('User Successfully Updated');
        fetchUsers();
      }
      if (res.status == 429) {
        closeUpdateModal();
      }
      setLoading(false);
    } catch (err) {
      toast.error(`Something went wrong ${err.message}`)
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete(
        `https://caf7193ed9bb0e76469f.free.beeceptor.com/api/users/${deleteData.id}`
      );
      console.log(res);
      if (res.status == 200) {
        closeDeleteModal();
        toast.success('User Successfully Deleted');
        fetchUsers();
      }
    } catch (err) {
      toast.error(`Something went wrong ${err.message}`)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
       <Toaster   
       position="bottom-right"
       reverseOrder={false}/>
        <main className="min-h-screen bg-[#F0F2F5]">
          <nav className="px-9 py-5 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/logo.svg"
                  width="49"
                  height="48"
                  alt="app_logo"
                ></Image>
                <div className="w-full space-y-1 relative">
                  <input
                    className="bg-[#F0F2F5] py-2.5 px-9 rounded-md w-[39.313rem]"
                    type="text"
                    placeholder="Search here..."
                  />
                  <img
                    className="absolute top-[0.5rem] left-4"
                    src="/search-icon.svg"
                  />
                </div>
              </div>
              <div className="flex gap-4 text-[#647995] font-normal">
                <div className="flex flex-col items-center">
                  <img src="/nots.svg" />
                  <p className="text-xs">Notifications</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/wallet.svg" />
                  <p className="text-xs">Wallet</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/Question.svg" />
                  <p className="text-xs">Inquiries</p>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/Gear.svg" />
                  <p className="text-xs text-[#0D6EFD] font-medium">Settings</p>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <img src="/avatar.svg" />
                  <img src="/CaretDown.svg" />
                </div>
              </div>
            </div>
          </nav>
          <section className="flex gap-14 py-5 pl-6 pr-8">
            <div className="bg-white border border-[#E4E7EC] rounded-md p-4 w-1/5">
              <h2 className="text-[#334155] text-xs font-bold">Settings</h2>
              <div className="flex flex-col gap-3  mt-2  border-b ">
                <div className="flex items-center gap-2 px-4 py-3">
                  <img src="/User.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">Account</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <img src="/Lock.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">Security</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <img src="/BellSimple.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">
                    Notifications
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <img src="/Money.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">Pricing</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3">
                  <img src="/Tag.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">Sales</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 bg-[#F0F6FE] rounded-md">
                  <img src="/Users.svg" />
                  <p className="text-[#0D6EFD] text-sm font-medium">
                    Users & Roles
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 mb-4">
                  <img src="/Cloud.svg" />
                  <p className="text-[#94A3B8] text-sm font-normal">Backups</p>
                </div>
              </div>
              <div className="mt-20">
                <div className="flex items-center justify-center gap-2 border border-[#475569] px-4 py-3 rounded-md">
                  <img src="/SignOut.svg" />
                  <p className="text-[#344054] text-sm font-medium">
                    Back to Dashboard
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div>
                <h3 className="text-sm font-medium text-[#98A2B3]">
                  Settings / Users & Roles Settings
                </h3>
                <div className="mt-6">
                  <h1 className="text-[#1D2739] text-2xl font-bold">
                    Users & Roles
                  </h1>
                  <p className="text-base font-normal text-[#98A2B3] mt-2">
                    Manage all users in your business
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mt-6">
                  <div className="py-2 px-5 border-b border-[#0D6EFD]">
                    <p className="text-[#0D6EFD] text-sm font-medium cursor-pointer">
                      Users
                    </p>
                  </div>
                  <div className="py-2 px-5">
                    <p className="text-sm text-[#98A2B3] font-medium cursor-pointer">
                      Roles
                    </p>
                  </div>
                </div>
                <div className="bg-white w-full mt-4 rounded-md">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center ">
                      <div className="w-full space-y-1 relative">
                        <input
                          className="border border-[#CBD5E1] py-2 px-9 rounded-md"
                          type="text"
                          placeholder="Search here..."
                        />
                        <img
                          className="absolute top-[0.5rem] left-4"
                          src="/search-icon.svg"
                        />
                      </div>
                      <button className="border border-[#CBD5E1] rounded-md py-2 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <img src="/button-filter.svg" />
                          <p className="text-sm font-bold text-[#334155]">
                            Filter
                          </p>
                        </div>
                      </button>
                    </div>
                    <button
                      onClick={() => showCreateModal()}
                      className="bg-[#0D6EFD] text-white rounded-md py-2 px-3"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <img src="/button-add.svg" />
                        <p>New User</p>
                      </div>
                    </button>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    {tableLoading ? (
                      <RotatingLines
                        visible={true}
                        height="24"
                        width="24"
                        color="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    ) : (
                      <table className="table-auto border-white bg-white w-full p-1">
                        <thead>
                          <tr className="bg-[#F0F2F5] p-4">
                            <th className="p-4">
                              <div className="flex items-center gap-3">
                                <input type="checkbox" />
                                <p className="text-[#1D2739] text-xs font-medium">
                                  Name
                                </p>
                                <img src="/chevron-v.svg" />
                              </div>
                            </th>
                            <th>
                              <div className="flex items-center gap-3">
                                <p className="text-[#1D2739] text-xs font-medium">
                                  Email Address
                                </p>
                                <img src="/chevron-v.svg" />
                              </div>
                            </th>
                            <th>
                              <div className="flex items-center gap-3">
                                <p className="text-[#1D2739] text-xs font-medium">
                                  Role
                                </p>
                                <img src="/chevron-v.svg" />
                              </div>
                            </th>
                            <th>
                              <div className="flex items-center gap-3">
                                <p className="text-[#1D2739] text-xs font-medium">
                                  Actions
                                </p>
                                <img src="/chevron-v.svg" />
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.map((item, index) => (
                            <tr id={item.id} key={index}>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <input type="checkbox" />
                                  <p className="text-[#1D2739] text-xs font-medium">
                                    {item.name}
                                  </p>
                                </div>
                              </td>
                              <td className="text-left">
                                <div className="flex items-center gap-3">
                                  <p className="text-[#1D2739] text-xs font-medium">
                                    {item.email}
                                  </p>
                                </div>
                              </td>
                              <td className="text-left">
                                {item.role == "Administrator" ? (
                                  <div className="w-fit bg-[#F0F6FE] py-0.5 px-3 rounded-xl">
                                    <p className="text-[#0D6EFD] text-xs font-medium">
                                      {item.role}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {item.role == "Sales Manager" ? (
                                  <div className="w-fit bg-[#E7F6EC] py-0.5 px-3 rounded-xl">
                                    <p className="text-[#0F973D] text-xs font-medium">
                                      {item.role}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                                {item.role == "Sales Representative" ? (
                                  <div className="w-fit bg-[#FEF4E6] py-0.5 px-3 rounded-xl">
                                    <p className="text-[#F58A07] text-xs font-medium">
                                      {item.role}
                                    </p>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="text-left">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => showUpdateModal(item)}
                                    className="text-[#0D6EFD] text-sm font-bold"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => showDeleteModal(item)}
                                    className="text-[#98A2B3] text-sm font-bold"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {createModal ? (
            <section className="bg-[#34405499] overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center">
              <div className="bg-white p-8 rounded-md w-2/5">
                <div
                  onClick={() => closeCreateModal()}
                  className="flex items-end justify-end cursor-pointer"
                >
                  <img src="/close.svg" />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center">
                    <img src="/user-avatar.svg" />
                    <h4 className="text-[#1D2739] text-2xl font-bold">
                      New User
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="New User’s Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="New User’s Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Role
                    </label>
                    <select
                      onChange={handleOptionSelect}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    >
                      <option disabled selected>
                        Select Role
                      </option>
                      {roleOptions?.map((role, index) => {
                        return <option key={index}>{role}</option>;
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Create Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a Password for New User"
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => createUser()}
                      className="bg-[#0D6EFD] text-white rounded-lg py-4 px-6 w-full flex items-center justify-center"
                    >
                      {loading ? (
                        <RotatingLines
                          visible={true}
                          height="24"
                          width="24"
                          color="white"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Add User"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
          {updateModal ? (
            <section className="bg-[#34405499] overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center">
              <div className="bg-white p-8 rounded-md w-2/5">
                <div
                  onClick={() => closeUpdateModal()}
                  className="flex items-end justify-end cursor-pointer"
                >
                  <img src="/close.svg" />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center">
                    <img src="/user-avatar.svg" />
                    <h4 className="text-[#1D2739] text-2xl font-bold">
                      Edit User
                    </h4>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="New User’s Email Address"
                      required
                      defaultValue={editData.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="New User’s Full Name"
                      required
                      defaultValue={editData.name}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Role
                    </label>
                    <select
                      onChange={handleOptionSelect}
                      defaultValue={editData.role}
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    >
                      <option disabled>Select Role</option>
                      {roleOptions?.map((role, index) => {
                        return <option key={index}>{role}</option>;
                      })}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm text-[#475367] font-medium">
                      Change Password
                    </label>
                    <input
                      type="password"
                      required
                      defaultValue={editData.password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a Password for New User"
                      className="w-full p-4 border border-[#D0D5DD] rounded-md"
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => updateUser()}
                      className="bg-[#0D6EFD] text-white rounded-lg py-4 px-6 w-full flex items-center justify-center"
                    >
                      {loading ? (
                        <RotatingLines
                          visible={true}
                          height="24"
                          width="24"
                          color="white"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Update User"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
          {deleteModal ? (
            <section className="bg-[#34405499] overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none flex justify-center items-center">
              <div className="bg-white p-8 rounded-md w-2/5">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-2xl text-[#1D2739] font-bold">
                    Delete this user
                  </h2>
                  <p className="text-base text-[#667185] font-normal text-center">
                    This user and all associated data will be <br></br>{" "}
                    permanently removed. Do you wish to continue
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-10">
                    <button
                      onClick={() => closeDeleteModal()}
                      className="bg-[#F7F9FC] border border-[#D0D5DD] rounded-md py-2 px-3 text-[#475367] text-sm font-bold"
                    >
                      {" "}
                      Cancel action
                    </button>
                    <button
                      onClick={() => deleteUser()}
                      className="bg-[#FBEAE9] border border-[#EB9B98] rounded-md py-2 px-3"
                    >
                      <div className=" flex items-center justify-center gap-3">
                        <img src="/button-trash.svg" />
                        <p className="text-[#D42620] text-sm font-bold">
                          Yes, Delete
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}
        </main> 
    </>
  );
}
