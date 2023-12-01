import Image from "next/image";

const MyProfilePage = () => {
  return (
    <div className="py-5">
      <div className="h-60 rounded-lg relative">
        <Image
          src="/images/banner.png"
          alt=""
          fill
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center gap-5">
          <Image
            src="https://source.unsplash.com/random"
            alt=""
            width={160}
            height={160}
            className="w-[160px] h-[160px] object-cover rounded-full -translate-y-1/2 border-4 border-white"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-xl">Omar Sulaiman</h3>
            <h4 className="text-sm text-secondary-color-3 mb-5">
              American Muslim scholar
            </h4>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Followers</h4>
              <h5>1,233</h5>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Following</h4>
              <h5>1,233</h5>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-gray-100 flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg">
              👋
            </div>
            <div>
              <h4 className="text-secondary-color-3">Questions</h4>
              <h5>1,233</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5"></div>
    </div>
  );
};

export default MyProfilePage;
