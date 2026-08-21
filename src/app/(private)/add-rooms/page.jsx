import { sessionCheck } from "@/app/lib/session";
import AddRoomForm from "@/Components/AddRoomForm/AddRoomForm";
import { Surface } from "@heroui/react";


export const metadata = {
    title: "add-room"
}

const AddRoomsPage = async() => {
    const session = await sessionCheck()
    const user = session?.user
    return (
        <div className="min-h-screen bg-default-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Add a New Room
                    </h1>

                    <p className="mt-2 text-sm text-default-500 sm:text-base">
                        Add your study room and make it available for students.
                    </p>
                </div>

                {/* Form Card */}
                <Surface className="rounded-3xl border grid  border-default-200 bg-white p-5 shadow-sm sm:p-8">
                   <AddRoomForm user = {user}/>
                </Surface>
            </div>
        </div>
    );
};

export default AddRoomsPage;