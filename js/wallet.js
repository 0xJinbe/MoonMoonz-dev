const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const moonMoonz = new ethers.Contract(
	ADDRESSES.MoonMoonz,
	ABIS.MoonMoonz,
	signer
);

const connect = async () => {
	await provider.send("eth_requestAccounts", []);

	const addr = await signer.getAddress();
	$("#connect-wallet").text(addr.substring(0, 9) + "...");
};

const mint = async () => {
	if (!(await signer.getAddress())) return;
	await moonMoonz.claim(1, { value: PRICE });
};

if (window.ethereum) {
	window.onload = async () => {
		await connect();
		provider.on("accountsChanged", () => window.location.reload());
	};

	$("#connect-wallet").click(connect);
	$("#buttonMintAction").click(mint);
}
export { moonMoonz, connect, mint, provider, signer }; 