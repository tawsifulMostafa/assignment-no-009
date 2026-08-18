import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const HomeBanner = () => {
    return (
        <div className="relative h-125   w-full overflow-hidden rounded-2xl">

            <Image
                src="/BannerImage.png"
                alt="Study room"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex items-center justify-center px-5">
                <div className="max-w-3xl text-center">

                    <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                        Find Your Perfect Study Space
                    </span>

                    <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                        Find Your
                        <span className="text-primary"> Comfort Zone</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-200 md:text-lg">
                        Discover comfortable and productive rooms designed
                        for studying, meetings, and focused work.
                        Choose the room that fits your needs.
                    </p>

                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href={"/rooms"}>
                            <Button


                                color="primary"
                                size="lg"
                                radius="full"
                                className="px-8 font-semibold"
                            >
                                Explore Rooms
                            </Button>
                        </Link>
                        <Link href={"/add-rooms"}> <Button variant="bordered"
                            size="lg"
                            radius="full"
                            className="border-white/60 bg-white/10 px-8 font-semibold text-white backdrop-blur-md"
                        >
                            Add Your Room
                        </Button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;