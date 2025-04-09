export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-0 justify-items-center px-4">
      <h1 className="text-2xl font-bold mb-4 my-8">
        Reconcile Agent Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        Reconcile Agent is a platform that helps you manage your finances.
      </p>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[20vw] font-bold leading-none sm:text-[15vw] md:text-[12vw] lg:text-[10vw]">
        <span className="bg-gradient-to-b from-gray-200 to-gray-100/30 to-80% bg-clip-text text-transparent -tracking-wide">
          Reconcile•Agent
        </span>
        <span className="absolute inset-0 bg-gray-300/70 bg-clip-text text-transparent mix-blend-darken [text-shadow:0_1px_0_white] -tracking-wide">
          Reconcile•Agent
        </span>
      </div>
      
    </div>
  );
}
