const HowItWorks = () => {
    const steps = [
        {
            number: "01",
            title: "Find Your Room",
            description:
                "Browse our available rooms and choose a comfortable space that matches your study or meeting needs.",
        },
        {
            number: "02",
            title: "Check Availability",
            description:
                "View room details, amenities, capacity, pricing, and available booking times before making your choice.",
        },
        {
            number: "03",
            title: "Book Your Space",
            description:
                "Select your preferred date and time, then confirm your booking quickly and easily.",
        },
    ];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                        Simple & Easy
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        How It Works
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Find and book your perfect study or meeting space
                        in just a few simple steps.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="group p-8 rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
                        >
                            {/* Number */}
                            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                {step.number}
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {step.title}
                            </h3>

                            <p className="text-gray-600 leading-7">
                                {step.description}  
                            </p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default HowItWorks;