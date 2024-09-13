"use client";
import { SearchNormal1, ArrowDown2 } from "iconsax-react";
import Select, { components } from "react-select";
import { useEffect, useRef, useState } from "react";
import ActionDropdown from "@components/dropdowns/ActionDropdown";
import axiosInterceptorInstance from "@utils/axiosInstance";
import "@styles/Tables.css";
import { getAllUsers } from "@redux/actions/usersActions";
import {
  getFirstNAme,
  getLastName,
  timeManipulation,
} from "@utils/dataManipulation";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "@components/modals/UserAddedModal"
import DisableUserModal from "@components/modals/DisableUserModal"



const profile = () => {
  const [selected, setSelected] = useState("");
  const [username, setUsername] = useState("");
  const [modalData, setModalData] = useState({});
  const [disableModalData, setDisableModalData] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  let [openDisableModal, setOpenDisableModal] = useState(false);
  const [action, setAction] = useState("")
  let usernames = useRef()
  const dispatch = useDispatch()

  let [isOpen, setIsOpen] = useState(false);
  const userData = (data) => {
    setDisableModalData(data)
  }
  const modalStates = (data) => {
    setOpenDisableModal(data)
  }
  const actionType = (data) => {
    setAction(data)
  }

  
  function closeModal() {
    setIsOpen(false)
    setOpenDisableModal(false)
  }

 
  const userSearch = () => {
    setUsername(usernames.current.value)
  }

  const {loading, users} = useSelector(state => state.users)
  useEffect(()=> {
    dispatch(getAllUsers(username))

  }, [username])

  const data = Array.isArray(users) ? users : [users]

  const addUser = (e) => {
    e.preventDefault()
    setIsLoading(true)
    const config = {
      method : 'post',
      url : `/api/v1/user/add-user`,
      contentType : 'application/json-patch+json',
      data : {
        username : email,
        role : selected.value
      }
  }
    axiosInterceptorInstance(config)
    .then((response) => {
      setIsOpen(true)
      setModalData(response.data)
      setIsLoading(false)
      setSuccess(false)
      setUsername("")
    })
    .catch((error) => {
      var errorData = JSON.parse(error.request.response)
      setIsOpen(true)
      setModalData(errorData)
      setIsLoading(false)
      setSuccess(false)
      setUsername("")


    });
  };
  const handleChange = (selectedOption) => {
    setSelected(selectedOption);
  };
  const indicatorSeparatorStyle = {
    width: 0,
  };

  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown2 label="Emoji" size="24" color="#292D32" />
      </components.DropdownIndicator>
    );
  };

  const options = [
    { value: "MAKER", label: "Maker" },
    { value: "CHECKER", label: "Checker" },
    { value: "ADMIN", label: "Admin" },
  ];
  return (


    <>
    <DisableUserModal openDisableModal={openDisableModal} closeModal={closeModal} data={disableModalData} action={action}/>
    <MyModal isOpen={isOpen} closeModal={closeModal} data={modalData} success={success} />
      <div className="text-2xl text-zinc-800 font-bold">Profile Management</div>

      <section className=" bg-white rounded-2xl space-y-11 pb-10">


        <div className="flex flex-row justify-between m-10">
          <div>
            <p className="text-xl text-zinc-800 font-semibold">
              User Information
            </p>
          </div>
          <div className="w-[400px] flex flex-col justify-start space-y-5">
            <div>
              <p className="text-zinc-800 font-light m-0">Email</p>

              <label className="relative block ">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 right-0 flex items-center p-2">
                  <SearchNormal1 className="m-4" size="24" color="#292D32" />
                </span>
                <input
                  className=" placeholder:text-slate-400 block w-full bg-neutral-50 h-10 border border-neutral-50 rounded-md py-2 pr-16 pl-3 shadow-sm focus:outline-none focus:border-purple-600 focus:bg-white  sm:text-sm"
                  placeholder="johndoe@fcmb.com"
                  type="text"
                  ref={usernames}
                />
              </label>
            </div>

            <button onClick={userSearch} className="self-end rounded-md w-[30%] bg-purple-800 text-white text-[12px] font-semibold px-10 py-2">
              Search
            </button>
          </div>
        </div>

        <div className="flex flex-col m-12">
          <div className="text-2xl text-zinc-800 font-semibold mb-10">
            User Details
          </div>

            <form onSubmit={addUser} className="flex flex-row justify-between">
              <div className="w-[400px] ">
                <label className="block">
                  <span className=" block text-base font-light text-slate-700">
                    Username / Email
                  </span>
                  <input
                    type="text"
                    className="placeholder:text-slate-400 block w-full bg-neutral-50 h-10 border border-neutral-50 rounded-md py-2 pr-16 pl-3 shadow-sm focus:outline-none focus:border-purple-600 focus:bg-white  sm:text-sm"
                    placeholder="John Doe"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="w-[400px] flex flex-col justify-start space-y-5">
                <div>
                  <p className="text-zinc-800 font-light m-0">Role</p>

                  <Select
                    onChange={handleChange}
                    autoFocus={true}
                    options={options}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 0,
                        boxShadow: "none",
                        outlineColor: state.isFocused ? "white" : "white",
                        backgroundColor: "#FAFAFA",
                        "&:hover": {
                          border: "1px solid purple",
                        },
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        backgroundColor: state.isFocused
                          ? "#5C2684"
                          : "#FAFBFB",
                        color: state.isFocused ? "#FBF9F9" : "#2D2235",
                        fontSize: 15,
                        fontWeight: 100,
                        height: 40
                      }),
                      placeholder: (baseStyles, state) => ({
                        ...baseStyles,
                        color: "2D2235",
                        fontSize: 15,
                        fontWeight: 100,
                      }),
                    }}
                    components={{ IndicatorSeparator, DropdownIndicator }}
                    className="basic-single"
                    classNamePrefix="Select"
                    isClearable={true}
                    isSearchable={true}
                    name="color"
                  />
                </div>
                {isLoading ?  ( <button
                  disabled
                  className="self-end rounded-md w-fit bg-purple-300 text-white text-[12px] font-semibold px-10 py-2"
                >
                  Loading
                </button>) :  ( <button
                  type="submit"
                  className="self-end rounded-md w-fit bg-purple-800 text-white text-[12px] font-semibold px-10 py-2"
                >
                  Add User
                </button>) }
               
              </div>
            </form>
          </div> 

        <div className="m-12">
          <table className="text-zinc-700 text-sm">
            <tbody>
              <tr className=" bg-purple-900 text-white">
                <th>S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created By</th>
                <th>Date Created</th>
                <th></th>
              </tr>
              {data &&
                data.map((data, i) => (
                  <tr key={i}>
                    <td>{data.id} </td>
                    <td>{getFirstNAme(data.username)}</td>
                    <td>{getLastName(data.username)} </td>
                    <td>{data.username} </td>
                    <td>{data.role}</td>
                    
                    <td>
                      {data.isActive ? (
                        <div className=" font-semibold bg-emerald-500 bg-opacity-20 rounded-full text-emerald-500 text-center text-[0.7rem]">
                          Active
                        </div>
                      ) : (
                        <div className=" font-semibold bg-red-500 bg-opacity-20 rounded-full text-center text-red-500 text-[0.7rem]">
                          Inactive
                        </div>
                      )}
                    </td>
                    <td>{data.createdBy}</td>
                    <td>{timeManipulation(data.createdOn)}</td>

                    <td className="action">
                      <ActionDropdown 
                      data={data.username} 
                      userData={userData} 
                      modalStates={modalStates}
                      actionType={actionType}
                      /> 
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default profile;
