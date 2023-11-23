import React from 'react';

export function Legal() {
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    };

    const headingStyle = {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
        marginTop: '20px',
    };

    const paragraphStyle = {
        marginBottom: '15px',
    };
    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Datenschutzerklärung für die Wishlingo</h1>

            <p style={paragraphStyle}>
                Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz "Daten") innerhalb unserer Chat-App auf.
            </p>



            <h2>Arten der verarbeiteten Daten</h2>
            <p>
                - Nachrichteninhalte: Die App speichert die von den Nutzern gesendeten Nachrichten.
                <br />
                - Benutzernamen: Die App speichert die von den Nutzern angegebenen Benutzernamen.
                <br />
                - Bilder: Die App kann Bilder speichern, die von den Nutzern hochgeladen wurden.
            </p>

            <h2>Zweck der Datenverarbeitung</h2>
            <p>
                Der Zweck der Datenverarbeitung liegt in der Bereitstellung und Optimierung der Chat-App sowie in der Sicherstellung der Kommunikation zwischen den Nutzern.
            </p>

            <h2>Speicherdauer</h2>
            <p>
                Die Daten werden für die Dauer der Nutzung der Chat-App gespeichert. Eine längere Speicherung erfolgt nur, wenn dies gesetzlich vorgeschrieben ist.
            </p>

            <h2>Weitergabe von Daten an Dritte</h2>
            <p>
                Eine Weitergabe von Daten an Dritte erfolgt nicht, es sei denn, es liegt eine gesetzliche Verpflichtung dazu vor.
            </p>

            <h2>Ihre Rechte als Nutzer</h2>
            <p>
                Als Nutzer haben Sie das Recht auf Auskunft, Berichtigung und Löschung Ihrer personenbezogenen Daten. Kontaktieren Sie uns dazu bitte über die im Impressum angegebenen Kontaktmöglichkeiten.
            </p>

            <h2>Letze Änderungen der Datenschutzerklärung</h2>
            <p>
                23.11.2023
            </p>
        </ div>
    );
}
