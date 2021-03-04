function printPage() {
    const event = new Event('beforeprint');
    window.dispatchEvent(event);

    setTimeout(() => {
        window.print();
    }, 50);

}

export default printPage;
