import { useNavigate } from "react-router-dom";

export function Homepage() {
    const navigate = useNavigate();
    
    function generateRoomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = 8;
    let roomId = '';
    for (let i = 0; i < length; i++) {
        roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
}

    function createRoom()
    {
        const roomId = generateRoomId();
        navigate("/room?roomId=" + roomId);

    }
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-center">
                <h1 className="font-bold text-5xl mb-6">Welcome to Bora Meet</h1>
                <p className="text-gray-700 text-xl">World's third best video meet platform</p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <button className="w-full p-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out"
                    onClick={createRoom}>
                    Create a Meeting
                </button>
                <button className="w-full p-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out">
                    Join a Meeting
                </button>
            </div>
            <footer className="text-center text-gray-500 text-sm py-4">
                Made with ❤️ in India
            </footer>
        </div>
    );
}
