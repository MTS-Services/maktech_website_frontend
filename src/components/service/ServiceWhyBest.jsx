// const ServiceWhyBest = ({
//   badgeText = 'Why We are best',
//   heading = 'Elevate Your Product With World-Class UI/UX Design',
//   paragraphs = [
//     'We design with real users in mind, conducting research and behavioral analysis to ensure every interface is intuitive, accessible, and aligned with genuine user needs.',
//     'Our process combines business goals with creative problem-solving, delivering solutions that not only look exceptional but also drive measurable growth and engagement.',
//     'Through usability testing, analytics, and continuous feedback loops, we refine every interaction to maximize performance, clarity, and user satisfaction.',
//     'From discovery and wireframing to visual systems and final delivery, we provide a seamless design experience focused on quality, consistency, and long-term success.',
//   ],
// }) => {
//   const linePositions = [12, 30, 50, 68, 88]
//   const leftCol = paragraphs.slice(0, 2)
//   const rightCol = paragraphs.slice(2, 4)

//   return (
//     <section className='relative overflow-hidden bg-white py-16 sm:py-20 md:py-24'>
//       {/* Subtle peach corners */}
//       <div
//         aria-hidden='true'
//         className='absolute inset-0'
//         style={{
//           background:
//             'radial-gradient(80% 80% at 100% 0%, rgba(255, 182, 146, 0.28), rgba(255, 182, 146, 0) 60%), radial-gradient(80% 80% at 0% 100%, rgba(255, 182, 146, 0.25), rgba(255, 182, 146, 0) 60%), #ffffff',
//         }}
//       />

//       <div className='pointer-events-none absolute inset-0 z-1'>
//         {linePositions.map((position, index) => (
//           <div
//             key={index}
//             className='absolute -top-15 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent'
//             style={{ left: `${position}%` }}
//           >
//             <div
//               className='absolute w-0.5 h-12 rounded-full opacity-60 animate-dropFall'
//               style={{
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 background:
//                   'linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)',
//                 animationDelay: `${index * 2}s`,
//               }}
//             />
//             <div
//               className='absolute w-0.5 h-10 rounded-full opacity-45 animate-dropFall'
//               style={{
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 background:
//                   'linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)',
//                 animationDelay: `${index * 2 + 4}s`,
//               }}
//             />
//           </div>
//         ))}
//       </div>

//       <div className='relative z-10 container mx-auto px-5 sm:px-10 lg:px-14 flex flex-col gap-14'>
//         <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
//           {/* Badge */}
//           <div className='inline-flex items-center gap-4'>
//             <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#623a2c] p-[5px]'>
//               <span
//                 className='h-[18px] w-[18px] rounded-full'
//                 style={{
//                   background: 'radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)',
//                   boxShadow: '2.25px 3.375px 4.5px rgba(68,18,0,0.36)',
//                 }}
//               />
//             </span>
//             <span className='text-[20px] font-normal text-[#565656]'>{badgeText}</span>
//           </div>

//           {/* Body */}
//           <div className='flex w-full max-w-5xl flex-col gap-10'>
//             <h2 className='text-[28px] sm:text-[30px] md:text-[32px] font-semibold text-[#2f2f2f] leading-[1.3]'>
//               {heading}
//             </h2>

//             <div className='grid gap-8 md:grid-cols-2 md:gap-12 text-[#565656] text-[18px] sm:text-[20px] leading-[1.55]'>
//               <div className='space-y-8'>
//                 {leftCol.map((p, idx) => (
//                   <p key={`left-${idx}`}>{p}</p>
//                 ))}
//               </div>
//               <div className='space-y-8'>
//                 {rightCol.map((p, idx) => (
//                   <p key={`right-${idx}`}>{p}</p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ServiceWhyBest

const ServiceWhyBest = ({
  badgeText = 'Why We are best',
  heading = 'Elevate Your Product With World-Class UI/UX Design',
  paragraphs = [
    'We design with real users in mind, conducting research and behavioral analysis to ensure every interface is intuitive, accessible, and aligned with genuine user needs.',
    'Our process combines business goals with creative problem-solving, delivering solutions that not only look exceptional but also drive measurable growth and engagement.',
    'Through usability testing, analytics, and continuous feedback loops, we refine every interaction to maximize performance, clarity, and user satisfaction.',
    'From discovery and wireframing to visual systems and final delivery, we provide a seamless design experience focused on quality, consistency, and long-term success.',
  ],
}) => {
  const linePositions = [12, 30, 50, 68, 88]
  const leftCol = paragraphs.slice(0, 2)
  const rightCol = paragraphs.slice(2, 4)

  return (
    <section className='relative overflow-hidden bg-white py-16 sm:py-20 md:py-24'>
      {/* Subtle peach corners */}
      <div
        aria-hidden='true'
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(80% 80% at 100% 0%, rgba(255, 182, 146, 0.28), rgba(255, 182, 146, 0) 60%), radial-gradient(80% 80% at 0% 100%, rgba(255, 182, 146, 0.25), rgba(255, 182, 146, 0) 60%), #ffffff',
        }}
      />

      {/* Animated drop lines */}
      <div className='pointer-events-none absolute inset-0 z-1'>
        {linePositions.map((position, index) => (
          <div
            key={index}
            className='absolute -top-15 bottom-0 w-px bg-linear-to-b from-transparent via-black/5 to-transparent'
            style={{ left: `${position}%` }}
          >
            <div
              className='absolute w-[2.5px] h-12 rounded-full opacity-50 animate-dropFall'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                willChange: 'transform',
                background:
                  'linear-gradient(to bottom, rgba(255,101,51,0.2), #FF6533)',
                animationDelay: `${index * 2}s`,
                animationDuration: '10s',
              }}
            />
            <div
              className='absolute w-[2.5px] h-10 rounded-full opacity-40 animate-dropFall'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                willChange: 'transform',
                background:
                  'linear-gradient(to bottom, rgba(255,101,51,0.2), #FF6533)',
                animationDelay: `${index * 2 + 4}s`,
                animationDuration: '10s',
              }}
            />
          </div>
        ))}
      </div>

      <div className='relative z-10 container mx-auto px-5 sm:px-10 lg:px-14 flex flex-col gap-14'>
        <div className='flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between'>
          {/* Badge */}
          <div className='inline-flex items-center gap-4'>
            <span className='flex h-10 w-10 items-center justify-center rounded-lg bg-[#623a2c] p-[5px]'>
              <span
                className='h-[18px] w-[18px] rounded-full'
                style={{
                  background: 'radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)',
                  boxShadow: '2.25px 3.375px 4.5px rgba(68,18,0,0.36)',
                }}
              />
            </span>
            <span className='text-[20px] font-normal text-[#565656]'>{badgeText}</span>
          </div>

          {/* Body */}
          <div className='flex w-full max-w-5xl flex-col gap-10'>
            <h2 className='text-[28px] sm:text-[30px] md:text-[32px] font-semibold text-[#2f2f2f] leading-[1.3]'>
              {heading}
            </h2>

            <div className='grid gap-8 md:grid-cols-2 md:gap-12 text-[#565656] text-[18px] sm:text-[20px] leading-[1.55]'>
              <div className='space-y-8'>
                {leftCol.map((p, idx) => (
                  <p key={`left-${idx}`}>{p}</p>
                ))}
              </div>
              <div className='space-y-8'>
                {rightCol.map((p, idx) => (
                  <p key={`right-${idx}`}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceWhyBest