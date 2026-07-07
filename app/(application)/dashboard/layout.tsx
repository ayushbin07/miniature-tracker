import BottomNavigation from "@/components/navigation/BottomNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
     
      {children}
      <BottomNavigation />
    </>
  );
};

export default Layout;
