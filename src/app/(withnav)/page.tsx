// 'use client';

// import Link from 'next/link';
// import { meta } from './meta';

// function CatalogPage() {
//   return (
//     <div className="flex-1 flex flex-column align-items-center p-6">
//       <div style={{ maxWidth: 1200 }} className="w-full">
//         <div className="flex justify-content-between align-items-center mb-8">
//           <h1 className="text-3xl font-semibold text-gray-800 m-0">Temus</h1>
//         </div>
//         <div className="w-full">
//           <div className="grid gap-4">
//             {meta.map(({ title, description, href }) => (
//               <div key={href} className="col-12 sm:col-6 md:col-4">
//                 <div className="border-1 hover:surface-100 border-round border-300 h-full p-4 cursor-pointer no-underline shadow-sm hover:shadow-md transition-all duration-200">
//                   <Link 
//                     href={href} 
//                     className="inline-block no-underline h-full w-full"
//                   >
//                     <p className="text-xl font-medium mb-2 text-gray-800">{title}</p>
//                     <p className="text-sm text-gray-600 line-height-3">{description}</p>
//                     <div className="mt-2 flex align-items-center gap-2">
//                       <i className={`pi pi-volume-up text-sm`}></i>
//                       <span className="text-sm">Audio Chat</span>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CatalogPage

'use client';

import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div style={{ width: '100vw', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden', fontWeight: '60' }}>
      {/* Hero Section */}
      <div
        style={{
          height: '100vh',
          backgroundImage: "url('/auntiebot.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#000',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ position: 'absolute', top: 0, width: '100%', zIndex: 2 }}>
          <div
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              height: '100px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 2rem',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: '3rem',
                fontWeight: 800,
                background: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'rainbowText 3s linear infinite',
                backgroundSize: '400% 100%',
              }}
            >
              AuntieBot
            </h1>

            <Link href="/temus-avatar-customer" passHref>
              <button
                style={{
                  backgroundColor: '#ffffffcc',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Start
              </button>
            </Link>
          </div>

          <svg
            viewBox="0 0 1440 100"
            style={{ width: '100%', height: '60px', display: 'block' }}
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(0, 0, 0, 0.6)"
              d="M0,64 C360,120 1080,0 1440,64 L1440,0 L0,0 Z"
            />
          </svg>
        </div>

        {/* Speech Bubbles */}
        <div style={{ position: 'absolute', top: '35%', left: '2rem', maxWidth: '280px', zIndex: 3 }}>
          <div className="bubble right"> “Eh boy, how to check my CPF ah?”</div>
        </div>
        <div style={{ position: 'absolute', top: '45%', right: '2rem', maxWidth: '280px', zIndex: 3 }}>
          <div className="bubble left"> “Eh, what time the bus coming?”</div>
        </div>
        <div style={{ position: 'absolute', top: '58%', left: '2rem', maxWidth: '280px', zIndex: 3 }}>
          <div className="bubble right"> “Got what promo at NTUC now ah?”</div>
        </div>
        <div style={{ position: 'absolute', top: '70%', right: '2rem', maxWidth: '280px', zIndex: 3 }}>
          <div className="bubble left"> “Boy, you got any stories to tell me?”</div>
        </div>
      </div>

      {/* Feature Boxes */}
      <div
        style={{
          marginTop: '-100px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          zIndex: 5,
          position: 'relative',
        }}
      >
        {[
          { title: 'Talk in Singlish', color: '#ffe0e0' },
          { title: 'Remind Appointments', color: '#fff4d6' },
          { title: 'Explain Government Stuff', color: '#e0f7ff' },
          { title: 'Tell Stories / Jokes', color: '#e6ffe6' },
        ].map((feature, i) => (
          <div
            key={i}
            className="floating-box"
            style={{
              backgroundColor: feature.color,
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginTop: 0 }}>{feature.title}</h2>
            <p>AuntieBot helps you with this, no problem one!</p>
          </div>
        ))}
      </div>

      {/* Pink Wave + Footer */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-60px' }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <svg
            viewBox="0 0 1440 150"
            style={{
              width: '100%',
              height: '150px',
              display: 'block',
              marginBottom: '-80px',
            }}
            preserveAspectRatio="none"
          >
            <path
              fill="#ffd6e8"
              d="M0,96L48,85.3C96,75,192,53,288,74.7C384,96,480,160,576,165.3C672,171,768,117,864,106.7C960,96,1056,128,1152,138.7C1248,149,1344,139,1392,133.3L1440,128L1440,0L0,0Z"
            />
          </svg>
        </div>

        <div
          style={{
            background: '#fef6e4',
            padding: '6rem 2rem 6rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            marginTop: '-60px',
          }}
        >
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
            Thank you for visiting AuntieBot!
          </h2>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>
            Helping seniors every day with reminders, directions, promos, and friendly chat.
            AuntieBot always here for you. ❤️
          </p>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes floatUpDown {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .floating-box {
          animation: floatUpDown 4s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .floating-box:hover {
          transform: translateY(-20px);
        }

        @keyframes rainbowText {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .bubble {
          background: #fef6e4;
          padding: 1rem 1.5rem;
          border-radius: 64px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          font-weight: 500;
          position: relative;
          font-size: 0.95rem;
        }

        .bubble.left::after {
          content: '';
          position: absolute;
          top: 50%;
          left: -24px;
          transform: translateY(-50%);
          border-width: 20px;
          border-style: solid;
          border-color: transparent #fef6e4 transparent transparent;
        }

        .bubble.right::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -24px;
          transform: translateY(-50%);
          border-width: 20px;
          border-style: solid;
          border-color: transparent transparent transparent #fef6e4;
        }
      `}</style>
    </div>
  );
}
