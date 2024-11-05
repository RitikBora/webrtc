export const HeroSection = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-3xl lg:text-5xl" style={{ color: "#001858" }}>
            Why Choose Our Platform?
          </h2>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl lg:text-2xl md:py-6  lg:py-10" style={{ color: "#172c66" }}>
            Experience meetings like never before with our state-of-the-art platform designed to keep your conversations clear, collaborative, and secure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-[1000px] w-full">
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: "#001858" }}>Crystal-Clear Quality</h3>
            <p className="text-gray-600 md:text-lg">
              Enjoy HD audio and video that makes every interaction feel as if you're in the same room.
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: "#001858" }}>Secure & Reliable</h3>
            <p className="text-gray-600 md:text-lg">
              Feel confident with end-to-end encryption and robust security measures that keep your meetings private.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold" style={{ color: "#001858" }}>No Lag, No Delay</h3>
            <p className="text-gray-600 md:text-lg">
              Experience seamless connectivity even on low-bandwidth networks, ensuring uninterrupted meetings.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};
