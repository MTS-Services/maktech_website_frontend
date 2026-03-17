// const CareerShowcase = () => {
//     const showcaseItems = [
//         {
//             id: 1,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//             title: "Team Collaboration",
//             colSpan: "md:col-span-1",
//             rowSpan: "md:row-span-2", // Spans 2 rows vertically
//         },
//         {
//             id: 2,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
//             title: "Product Development",
//             colSpan: "md:col-span-2", // Spans 2 columns horizontally
//             rowSpan: "md:row-span-1",
//         },
//         {
//             id: 3,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//             title: "Office Culture",
//             colSpan: "md:col-span-1",
//             rowSpan: "md:row-span-1",
//         },
//         {
//             id: 4,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//             title: "Team Building",
//             colSpan: "md:col-span-1",
//             rowSpan: "md:row-span-1",
//         },
//         {
//             id: 5,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60",
//             title: "Innovation Lab",
//             colSpan: "md:col-span-2", // Spans 2 columns horizontally
//             rowSpan: "md:row-span-1",
//         },
//         {
//             id: 6,
//             image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
//             title: "Workspace",
//             colSpan: "md:col-span-1",
//             rowSpan: "md:row-span-1",
//         },
//     ];

//     return (
//         <section className=""> 
//             <div className="container mx-auto  px-4">

//                 {/* Masonry Grid */}
//                 {/* Added auto-rows-[250px] on md to force consistent heights across the grid */}
//                 <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[250px] md:gap-4 auto-rows-[250px]">
//                     {showcaseItems.map((item) => (
//                         <div
//                             key={item.id}
//                             className={`${item.colSpan} ${item.rowSpan} group relative overflow-hidden rounded-xl bg-gray-300`} // Rounded to match image and bg color as fallback
//                         >
//                             <img
//                                 src={item.image}
//                                 alt={item.title}
//                                 className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                             />

//                             {/* Overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default CareerShowcase;





const CareerShowcase = () => {
    const showcaseItems = [
        {
            id: 1,
            // Vertical image
            image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
            title: "Team Collaboration",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-2", 
        },
        {
            id: 2,
            // Horizontal image
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
            title: "Product Development",
            colSpan: "md:col-span-2", 
            rowSpan: "md:row-span-1",
        },
        {
            id: 3,
            // Square image
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
            title: "Office Culture",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
        {
            id: 4,
            // Square image
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
            title: "Team Building",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
        {
            id: 5,
            // Horizontal image
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
            title: "Innovation Lab",
            colSpan: "md:col-span-2", 
            rowSpan: "md:row-span-1",
        },
        {
            id: 6,
            // Square image
            image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=800&q=80",
            title: "Workspace",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1",
        },
    ];

    return (
        <section className="py-12  h-screen"> 
            <div className="container mx-auto px-4">

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[250px] md:gap-4 auto-rows-[250px]">
                    {showcaseItems.map((item) => (
                        <div
                            key={item.id}
                            className={`${item.colSpan} ${item.rowSpan} group relative overflow-hidden rounded-xl bg-zinc-800`} 
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            
                            {/* Title */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 transition-transform duration-300 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CareerShowcase;