import { Link } from 'react-router-dom';

const NotFound = ({ lang }) => {
    const t = {
        en: {
            title: "404",
            subtitle: "Page Not Found",
            message: "The page you're looking for doesn't exist or has been moved.",
            btn: "Go Home"
        },
        hi: {
            title: "404",
            subtitle: "पेज नहीं मिला",
            message: "आप जिस पेज की तलाश कर रहे हैं वह मौजूद नहीं है।",
            btn: "होम जाएं"
        }
    }[lang || 'en'];

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
            <div className="text-center max-w-md">
                {/* Large 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[12rem] font-black text-slate-100 leading-none select-none">{t.title}</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl">🥛</span>
                    </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4">{t.subtitle}</h2>
                <p className="text-slate-500 font-medium mb-10 leading-relaxed">{t.message}</p>

                <Link
                    to="/"
                    className="inline-block px-10 py-4 bg-sky-500 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-sky-600 hover:-translate-y-1 transition-all"
                >
                    ← {t.btn}
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
