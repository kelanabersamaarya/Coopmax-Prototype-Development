"use client";

export default function EKolektorSimpananAsset() {
  return (
    <div className="mt-[26px] flex flex-col items-center">
      <svg
        viewBox="0 0 220 170"
        fill="none"
        className="h-[170px] w-[220px]"
        aria-hidden="true"
      >
        <path
          d="M112 28C93 40 100 62 120 61C143 60 141 33 119 38C95 43 88 75 112 88C138 102 153 72 127 66C98 60 75 91 91 118"
          stroke="#AFAFAF"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        <path d="M44 86L78 58H165L192 86H44Z" fill="#A8A8A8" />
        <path d="M78 58H165L190 84H101L78 58Z" fill="#BDBDBD" />
        <path d="M75 82H166V140H75V82Z" fill="#B9B9B9" />
        <path d="M75 82L101 107H190L166 82H75Z" fill="#6F6F6F" />
        <path d="M101 98H190V108H101V98Z" fill="#9B9B9B" />
        <path d="M78 58L101 82H190L166 58H78Z" fill="#B5B5B5" />

        <circle cx="104" cy="111" r="3.2" fill="#203040" />
        <circle cx="136" cy="111" r="3.2" fill="#203040" />

        <path
          d="M106 132C112 121 128 121 134 132"
          stroke="#7A7A7A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        <rect x="160" y="129" width="14" height="18" fill="white" />
      </svg>

      <div className="-mt-1 text-center text-[12px] font-normal leading-tight text-[#8E8E8E]">
        Tidak Ada Data Simpanan
      </div>
    </div>
  );
}