import Link from "next/link";
import { Button } from "@heroui/react";
import { SearchX, Home } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6">
            <div className="text-center max-w-md">

                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                        <SearchX size={40} className="text-primary" />
                    </div>
                </div>

                <h1 className="text-7xl font-bold text-primary">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-default-500 mt-3">
                    Sorry, the page you are looking for doesn&apos;t exist
                    or may have been moved.
                </p>

                <div className="flex justify-center mt-7">
                    <Link href = {"/"}>
                        <Button

                            color="primary"
                            startContent={<Home size={18} />}
                        >
                            Back to Home
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;