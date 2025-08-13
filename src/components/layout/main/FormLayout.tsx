export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen dark:bg-gray-900 mt-6 py-6 px-4">
      <div className="absolute inset-0 backdrop-blur-sm z-0" />
      <div className="relative z-10 flex items-center justify-center w-full">
<div className="w-full max-w-[1200px] bg-white dark:bg-gray-800 p-4 sm:p-6 shadow-xl rounded-[28px]">
  {children}
</div>
      </div>
    </div>
  );
}
