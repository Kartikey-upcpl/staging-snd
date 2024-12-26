import Loading from "@/components/ui/Loading";

export default function Submit({ isPending, label }: { isPending: boolean, label: string }) {
    return (
        <button
                className="btn btn-primary w-100 text-uppercase"
                type="submit"
            >
                {isPending ? <Loading className="spinner-border-sm text-white" /> : label}
            </button>
    );
}