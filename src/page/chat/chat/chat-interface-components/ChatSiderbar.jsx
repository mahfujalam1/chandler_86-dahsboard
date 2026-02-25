

function ChatSiderbar({ setSelectedUser }) {
    const userData = [
        {
            id: "c12345",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "Hi, how are you?",
            time: "10:00 AM",
        },
        {
            id: "c12346",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm good, thanks. How about you?",
            time: "09:00 AM",
        },
        {
            id: "c12347",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "I'm good too. How about you plan for the weekend?",
            time: "08:00 AM",
        },
        {
            id: "c12348",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm planning to go to the beach with my friends.",
            time: "07:00 AM",
        },
        {
            id: "c12349",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "Hi, how are you?",
            time: "10:00 AM",
        },
        {
            id: "c123410",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm good, thanks. How about you?",
            time: "09:00 AM",
        },
        {
            id: "c123411",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "I'm good too. How about you plan for the weekend?",
            time: "08:00 AM",
        },
        {
            id: "c123412",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm planning to go to the beach with my friends.",
            time: "07:00 AM",
        },
        {
            id: "c12345",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "Hi, how are you?",
            time: "10:00 AM",
        },
        {
            id: "c12346",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm good, thanks. How about you?",
            time: "09:00 AM",
        },
        {
            id: "c12347",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "I'm good too. How about you plan for the weekend?",
            time: "08:00 AM",
        },
        {
            id: "c12348",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm planning to go to the beach with my friends.",
            time: "07:00 AM",
        },
        {
            id: "c12349",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "Hi, how are you?",
            time: "10:00 AM",
        },
        {
            id: "c123410",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm good, thanks. How about you?",
            time: "09:00 AM",
        },
        {
            id: "c123411",
            name: "John Doe",
            avatar: "https://avatar.iran.liara.run/public/13",
            status: "Online",
            last_message: "I'm good too. How about you plan for the weekend?",
            time: "08:00 AM",
        },
        {
            id: "c123412",
            name: "Jane Smith",
            avatar: "https://avatar.iran.liara.run/public/20",
            status: "Offline",
            last_message: "I'm planning to go to the beach with my friends.",
            time: "07:00 AM",
        },
    ]
    return (
        <div className='w-[350px] h-full shadow p-1'>
            <input
                className='w-full p-2 h-[50px] border outline-none border-gray-200 rounded mb-4'
                type="text" placeholder={` Search`}
                onChange={(e) => console.log(e.target.value)} />
            <div className='max-h-[calc(100vh-155px)] hide-scrollbar overflow-y-auto'>
                {
                    userData.map((item, index) => (
                        <UserChat key={index} {...item} setSelectedUser={setSelectedUser} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatSiderbar

const UserChat = ({ name, avatar, last_message, id, setSelectedUser }) => {
    return (
        <div onClick={() => {
            setSelectedUser({ name, avatar, last_message, id })
            localStorage.setItem("selectedUser", JSON.stringify({ name, avatar, last_message, id }));
        }}
            className='flex gap-2 hover:bg-gray-100 p-2 cursor-pointer space-y-2 mb-2 border-b pb-2 border-gray-200 w-full items-center'>
            <img className='min-w-12 w-12 h-12 min-h-12 border border-gray-200 shadow rounded-full' src={avatar} alt="" />
            <div>
                <p className='text-lg font-semibold'>{name}</p>
                <p className='text-gray-500 line-clamp-1'>{last_message}</p>
            </div>
        </div>
    )
}