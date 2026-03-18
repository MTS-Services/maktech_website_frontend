const CareerShowcase = () => {
    const showcaseItems = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
            title: "Team Collaboration",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2", 
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            title: "Product Development",
            colSpan: "md:col-span-2", 
            rowSpan: "md:row-span-1",
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
            title: "Office Culture",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
            title: "Team Building",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
            title: "Innovation Lab",
            colSpan: "md:col-span-2", 
            rowSpan: "md:row-span-1",
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
            title: "Workspace",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
    ];

    return (
        <section className="relative w-full bg-black-bg h-auto lg:h-screen px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 overflow-hidden flex items-center py-10 lg:py-16"> 
            <div className=" mx-auto max-w-7xl  h-full">

                {/* Masonry Grid - Forced to fit screen using grid-rows-3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-full">
                    {showcaseItems.map((item) => (
                        <div
                            key={item.id}
                            className={`${item.colSpan} ${item.rowSpan} relative overflow-hidden rounded-xl bg-zinc-800`} 
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                            />

                            {/* Overlay - Now always visible */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                            
                            {/* Title - Now always visible */}
                            {/* <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                                <h3 className="text-lg md:text-xl font-semibold text-white">
                                    {item.title}
                                </h3>
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerShowcase;