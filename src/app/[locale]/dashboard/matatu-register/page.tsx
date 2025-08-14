import MatatuRegisterForm from "@/app/components/dashboard/matatu/MatatuRegisterForm";

export default function MatatuRegisterPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Matatu Registration</h1>
            <div className="bg-background shadow-md p-4">
                <MatatuRegisterForm />
            </div>
            
        </div>
    );
}