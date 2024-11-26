import React from "react";

const LogoIcon = () => (
  <svg width="40" height="40" viewBox="0 0 17.5 16.2">
    <path
      d="M3.2 0l5.4 5.6L14.3 0l3.2 3v9L13 16.2V7.8l-4.4 4.1L4.5 8v8.2L0 12V3l3.2-3z"
      fill="white"
    />
  </svg>
);

const WavePattern = () => (
  <svg
    viewBox="0 3.71 26.959 38.787"
    width="26.959"
    height="38.787"
    fill="white"
    className="opacity-80"
  >
    <path d="M19.709 3.719c.266.043.5.187.656.406 4.125 5.207 6.594 11.781 6.594 18.938 0 7.156-2.469 13.73-6.594 18.937-.195.336-.57.531-.957.492a.9946.9946 0 0 1-.851-.66c-.129-.367-.035-.777.246-1.051 3.855-4.867 6.156-11.023 6.156-17.718 0-6.696-2.301-12.852-6.156-17.719-.262-.317-.301-.762-.102-1.121.204-.36.602-.559 1.008-.504z" />
    <path d="M13.74 7.563c.231.039.442.164.594.343 3.508 4.059 5.625 9.371 5.625 15.157 0 5.785-2.113 11.097-5.625 15.156-.363.422-1 .472-1.422.109-.422-.363-.472-1-.109-1.422 3.211-3.711 5.156-8.551 5.156-13.843 0-5.293-1.949-10.133-5.156-13.844-.27-.309-.324-.75-.141-1.114.188-.367.578-.582.985-.542h.093z" />
    <path d="M7.584 11.438c.227.031.438.144.594.312 2.953 2.863 4.781 6.875 4.781 11.313 0 4.433-1.828 8.449-4.781 11.312-.398.387-1.035.383-1.422-.016-.387-.398-.383-1.035.016-1.421 2.582-2.504 4.187-5.993 4.187-9.875 0-3.883-1.605-7.372-4.187-9.875-.321-.282-.426-.739-.266-1.133.164-.395.559-.641.984-.617h.094zM1.178 15.531c.121.02.238.063.344.125 2.633 1.414 4.437 4.215 4.437 7.407 0 3.195-1.797 5.996-4.437 7.406-.492.258-1.102.07-1.36-.422-.257-.492-.07-1.102.422-1.359 2.012-1.075 3.375-3.176 3.375-5.625 0-2.446-1.371-4.551-3.375-5.625-.441-.204-.676-.692-.551-1.165.122-.468.567-.785 1.051-.742h.094z" />
  </svg>
);

const Chip = () => (
  <div className="relative w-[50px] h-[40px] rounded bg-gradient-to-bl from-[#ffecc7] to-[#d0b978] overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute w-full h-[1px] bg-[#333] top-[13px]"></div>
      <div className="absolute w-full h-[1px] bg-[#333] top-[20px]"></div>
      <div className="absolute w-full h-[1px] bg-[#333] top-[28px]"></div>
      <div className="absolute w-[1px] h-[50px] bg-[#333] left-[25px]"></div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-7 border border-[#333] rounded bg-gradient-to-bl from-[#efdbab] to-[#e1cb94]"></div>
    </div>
  </div>
);

const formatCardNumber = (number) => {
  return (
    number
      .toString()
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") || ""
  );
};

const CARD_VARIANTS = {
  black: {
    background: 'from-[#111111] to-[#555555]',
    stripe: 'from-[#ff6767] to-[#ff4545]'
  },
  blue: {
    background: 'from-[#1a1f71] to-[#2b3595]',
    stripe: 'from-[#2193b0] to-[#6dd5ed]'
  },
  purple: {
    background: 'from-[#31087B] to-[#653780]',
    stripe: 'from-[#FA2FB5] to-[#FF69B4]'
  },
  yellow: {
    background: 'from-zinc-900 to-zinc-800',
    stripe: 'from-yellow-500 to-yellow-600'
  },
  golden: {
    background: 'from-[#462523] to-[#cb9b51]',
    stripe: 'from-[#f6e27a] to-[#cb9b51]'
  },
  custom: (bgFrom, bgTo, stripeFrom, stripeTo) => ({
    background: `from-[${bgFrom}] to-[${bgTo}]`,
    stripe: `from-[${stripeFrom}] to-[${stripeTo}]`
  })
};

const CreditCard = ({
  cardNumber = "5453 2000 0000 0000",
  cardHolder = "MR FILIP VITAS",
  expiryDate = "11/22",
  variant = "black",
  className = "",
  type = "INVESTOR", // or any other card type
}) => {
  const colors = CARD_VARIANTS[variant] || CARD_VARIANTS.black;
  const formattedNumber = formatCardNumber(cardNumber);

  return (
    <div
      className={`w-[340px] h-[216px] relative group perspective-1000 ${className}`}
    >
      <div
        className={`w-full h-full rounded-xl bg-gradient-to-r ${colors.background} text-white relative overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105`}
      >
        {/* Stripes */}
        <div
          className={`absolute right-0 top-0 h-full w-[200px] bg-gradient-to-b ${colors.stripe} -skew-x-[20deg] translate-x-[50px] shadow-lg`}
        ></div>
        <div
          className={`absolute right-0 top-0 h-full w-[180px] bg-gradient-to-b ${colors.stripe} skew-x-[15deg] translate-x-[50px] shadow-lg`}
        ></div>

        {/* Content container */}
        <div className="relative z-10 p-6 h-full">
          {/* Logo */}
          <div className="absolute top-6 right-6">
            <LogoIcon />
          </div>

          {/* Card Type */}
          <div className="font-mono uppercase text-sm tracking-wider">
            {type}
          </div>

          {/* Chip and wave */}
          <div className="mt-6 flex items-center space-x-4">
            <Chip />
            <div className="w-8 h-8">
              <WavePattern />
            </div>
          </div>

          {/* Card number */}
          <div className="mt-6 flex space-x-4 font-mono text-[23px] tracking-wider">
            {formattedNumber.split(" ").map((group, index) => (
              <div key={index}>{group}</div>
            ))}
          </div>

          {/* Card details */}
          <div className="mt-4 flex justify-between items-end">
            <div>
              <div className="text-[9px] text-white/80 uppercase font-mono">
                exp. end:
              </div>
              <div className="font-mono text-sm">{expiryDate}</div>
            </div>
            <div className="font-mono text-sm uppercase">{cardHolder}</div>
          </div>

          {/* Mastercard circles */}
          <div className="absolute bottom-6 right-6 flex">
            <div className="w-[25px] h-[25px] rounded-full bg-[#eb001b]"></div>
            <div className="w-[25px] h-[25px] rounded-full bg-[#f79e1b] opacity-70 -ml-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
