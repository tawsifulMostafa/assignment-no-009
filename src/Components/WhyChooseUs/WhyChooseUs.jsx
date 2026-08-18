import { Wifi, MonitorPlay, Users, CalendarCheck } from "lucide-react";

const features = [
    {
        icon: Wifi,
        title: "High-Speed Wi-Fi",
        description:
            "Stay connected with fast and reliable internet for study sessions, meetings, and online work.",
    },
    {
        icon: MonitorPlay,
        title: "Modern Amenities",
        description:
            "Enjoy projectors, whiteboards, power outlets, and air conditioning for a comfortable experience.",
    },
    {
        icon: Users,
        title: "Flexible Spaces",
        description:
            "Choose from rooms of different sizes for individual study, group projects, or team meetings.",
    },
    {
        icon: CalendarCheck,
        title: "Easy Booking",
        description:
            "Find your preferred room, pick a date and time, and reserve it in just a few clicks.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-20">
            <div className="mb-12 text-center">
                <p className="font-medium text-primary">Why Choose Us</p>

                <h2 className="mt-3 text-3xl font-bold md:text-5xl">
                    Everything You Need for a Better Workspace
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                    StudyNook provides comfortable and well-equipped spaces designed to
                    help you study, collaborate, and work with ease.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => {
                    const Icon = feature.icon;

                    return (
                        <div
                            key={index}
                            className="rounded-2xl border border-default-200 bg-content1 p-6 transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Icon size={28} />
                            </div>

                            <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>

                            <p className="text-sm leading-6 text-gray-500">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyChooseUs;