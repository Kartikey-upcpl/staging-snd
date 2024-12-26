import Sidebar from "@/components/account/Sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <main className="bg-white">
            <section className="my-account container py-8 bg-white">
                <h2 className="page-title">My account</h2>
                <div className="row">
                    <Sidebar />
                    <div className="col-lg-9 p-0">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
}