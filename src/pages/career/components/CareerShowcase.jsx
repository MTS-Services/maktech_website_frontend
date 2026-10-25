const CareerShowcase = () => {
    // Top block: one tall photo on the left, a 2-row mosaic on the right
    const topItems = [
        {
            id: 1,
            image: "https://cdn.maktechgroup.com/media/1792647403087-f75930c4-a385-4a90-9bdd-05047ed73af8.png",
            title: "Team Collaboration",
            className: "row-span-2 md:row-span-2",
        },
        {
            id: 2,
            image: "https://cdn.maktechgroup.com/media/1792647410992-80726356-03a5-4d96-9138-653eeeada0ba.jpg",
            title: "Product Development",
            className: "md:col-span-2",
        },
        {
            id: 3,
            image: "https://cdn.maktechgroup.com/media/1792647406503-42b0924f-0ec0-4fd3-853b-be42ed430f3c.jpg",
            title: "Office Culture",
            className: "",
        },
        {
            id: 4,
            image: "https://cdn.maktechgroup.com/media/1792647404446-eee83e4f-b633-4f54-948c-b193f9bba86c.jpg",
            title: "Team Building",
            className: "",
        },
        {
            id: 5,
            image: "https://cdn.maktechgroup.com/media/1792647409668-32d5939e-2fd4-4ab4-bbd9-ac50d4ba615c.jpg",
            title: "Innovation Lab",
            className: "md:col-span-2",
        },
    ];

    // Bottom row: one wide photo followed by two smaller ones
    const bottomItems = [
        {
            id: 6,
            image: "https://cdn.maktechgroup.com/media/1792647407371-6b06a204-b3ab-4857-948e-33f622de86f8.jpg",
            title: "Workspace",
            className: "col-span-2 md:col-span-1",
        },
        {
            id: 7,
            image: "https://cdn.maktechgroup.com/media/1792647412424-1885453e-827c-4b79-aa38-75433de45428.jpg",
            title: "Team Meeting",
            className: "",
        },
        {
            id: 8,
            image: "https://cdn.maktechgroup.com/media/1792647405556-9c80ae21-e8bb-4c9f-828a-4295bc2e09f8.jpg",
            title: "Focused Work",
            className: "",
        },
    ];

    const renderTile = (item) => (
        <div
            key={item.id}
            className={`${item.className} relative overflow-hidden rounded-xl bg-zinc-800`}
        >
            <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
    );

    return (
        <section className="relative w-full h-auto px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 overflow-hidden flex items-center py-10 lg:py-16">
            <div className="mx-auto flex w-full max-w-360 flex-col gap-3 md:gap-4">
                <div className="grid grid-cols-2 auto-rows-[200px] gap-3 sm:auto-rows-[250px] md:h-[560px] md:auto-rows-auto md:grid-cols-[2.35fr_2.2fr_1fr_2.4fr] md:grid-rows-[0.9fr_1fr] md:gap-4 lg:h-[640px] xl:h-[720px]">
                    {topItems.map(renderTile)}
                </div>

                <div className="grid grid-cols-2 auto-rows-[200px] gap-3 sm:auto-rows-[250px] md:h-[260px] md:auto-rows-auto md:grid-cols-[1.8fr_1fr_1fr] md:gap-4 lg:h-[300px] xl:h-[340px]">
                    {bottomItems.map(renderTile)}
                </div>
            </div>
        </section>
    );
};

export default CareerShowcase;
