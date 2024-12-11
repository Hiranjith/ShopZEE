const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm ml-[4rem]">&copy; {new Date().getFullYear()} Shopzee. All rights reserved.</p>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
                    <a href="/contact" className="hover:underline">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
