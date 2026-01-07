import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addCompletedLevel, addProgressEntry } from "@/lib/progressStorage";
import elephantIcon from "@/assets/elephant-icon.png";

interface Question {
  question: string;
  options: string[];
  correct: number;
  difficulty: number;
}

const quizData: Record<string, Question[]> = {
  geschichte: [
    // Level 1 (Questions 1-10)
    { question: "Wer war der erste Bundeskanzler der Bundesrepublik Deutschland?", options: ["Willy Brandt", "Konrad Adenauer", "Helmut Schmidt", "Ludwig Erhard"], correct: 1, difficulty: 1 },
    { question: "Wann fiel die Berliner Mauer?", options: ["1987", "1989", "1990", "1991"], correct: 1, difficulty: 1 },
    { question: "In welchem Jahr begann der Zweite Weltkrieg?", options: ["1939", "1918", "1941", "1945"], correct: 0, difficulty: 1 },
    { question: "Wer war der erste Mensch im Weltraum?", options: ["Juri Gagarin", "Neil Armstrong", "Laika", "Alan Shepard"], correct: 0, difficulty: 1 },
    { question: "Wie hieß das Schiff, das 1912 sank?", options: ["Britannic", "Titanic", "Lusitania", "Queen Mary"], correct: 1, difficulty: 1 },
    { question: "Welches Land entdeckte Christoph Kolumbus 1492?", options: ["Amerika", "Indien", "Australien", "Afrika"], correct: 0, difficulty: 1 },
    { question: "Welche Stadt wurde 79 n. Chr. vom Vesuv zerstört?", options: ["Pompeji", "Rom", "Athen", "Troja"], correct: 0, difficulty: 1 },
    { question: "Wer war der berühmteste Pharao des Alten Ägypten?", options: ["Tutanchamun", "Ramses II.", "Kleopatra", "Echnaton"], correct: 0, difficulty: 1 },
    { question: "Wie hieß das Römische Reich im Osten nach 395 n. Chr.?", options: ["Heiliges Römisches Reich", "Byzantinisches Reich", "Osmanisches Reich", "Perserreich"], correct: 1, difficulty: 1 },
    { question: "Was wurde 1776 in den USA unterzeichnet?", options: ["Unabhängigkeitserklärung", "Verfassung", "Bill of Rights", "Bürgerrechtsgesetz"], correct: 0, difficulty: 1 },
    
    // Level 2 (Questions 11-20)
    { question: "Wer war der Feldherr, der das Römische Reich erweiterte und Kaiser wurde?", options: ["Julius Caesar", "Augustus", "Nero", "Hadrian"], correct: 0, difficulty: 2 },
    { question: "Wann endete der Erste Weltkrieg?", options: ["1917", "1918", "1919", "1920"], correct: 1, difficulty: 2 },
    { question: "Wie hieß das Verteidigungsbündnis der westlichen Staaten nach 1949?", options: ["NATO", "UNO", "EU", "Warschauer Pakt"], correct: 0, difficulty: 2 },
    { question: "Was war die DDR?", options: ["Demokratische Partei", "Deutsche Demokratische Republik", "Deutsches Direktreferendum", "Deutsche Datenregion"], correct: 1, difficulty: 2 },
    { question: "Wann wurde Deutschland wiedervereinigt?", options: ["1988", "1990", "1991", "1992"], correct: 1, difficulty: 2 },
    { question: "Wer war Karl der Große?", options: ["König der Franken und Kaiser des Römischen Reichs", "Bischof", "Philosoph", "Seefahrer"], correct: 0, difficulty: 2 },
    { question: "Was erfand Johannes Gutenberg?", options: ["Buchdruck", "Dampfmaschine", "Kompass", "Mikroskop"], correct: 0, difficulty: 2 },
    { question: "Wer war 'der Sonnenkönig'?", options: ["Karl V.", "Ludwig XIV.", "Napoleon", "Friedrich II."], correct: 1, difficulty: 2 },
    { question: "Wann begann die Französische Revolution?", options: ["1789", "1799", "1804", "1812"], correct: 0, difficulty: 2 },
    { question: "Wer führte die Reformation in Deutschland ein?", options: ["Martin Luther", "Johannes Calvin", "Ulrich Zwingli", "Thomas Müntzer"], correct: 0, difficulty: 2 },
    
    // Level 3 (Questions 21-30)
    { question: "Wann begann die Industrialisierung in Europa ungefähr?", options: ["14. Jh.", "16. Jh.", "18. Jh.", "20. Jh."], correct: 2, difficulty: 3 },
    { question: "Wie hieß das Reich der alten Griechen?", options: ["Hellenisches Reich", "Alexandrinisches Reich", "Byzantinisches Reich", "Troianisches Reich"], correct: 0, difficulty: 3 },
    { question: "Was war der 'Kalte Krieg'?", options: ["Spannungszustand zwischen USA und UdSSR", "Bürgerkrieg", "Wirtschaftskrise", "Krieg in Nordeuropa"], correct: 0, difficulty: 3 },
    { question: "Wie hieß der berühmte Anführer der Mongolen?", options: ["Dschingis Khan", "Kublai Khan", "Timur Lenk", "Attila"], correct: 0, difficulty: 3 },
    { question: "Wann wurde die EU-Vorläuferorganisation EWG gegründet?", options: ["1957", "1963", "1972", "1981"], correct: 0, difficulty: 3 },
    { question: "Welche Stadt wurde als 'Wiege der Demokratie' bezeichnet?", options: ["Athen", "Rom", "Karthago", "Jerusalem"], correct: 0, difficulty: 3 },
    { question: "Welche antike Königin herrschte über Ägypten und hatte eine Beziehung zu Caesar?", options: ["Kleopatra", "Nofretete", "Hatschepsut", "Zenobia"], correct: 0, difficulty: 3 },
    { question: "Wer erfand die Glühbirne?", options: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Benjamin Franklin"], correct: 1, difficulty: 3 },
    { question: "Wann wurde die Berliner Luftbrücke durchgeführt?", options: ["1946–47", "1948–49", "1950–51", "1953–54"], correct: 1, difficulty: 3 },
    { question: "Wer schrieb das 'Kommunistische Manifest'?", options: ["Karl Marx & Friedrich Engels", "Lenin", "Mao Zedong", "Stalin"], correct: 0, difficulty: 3 },
    
    // Level 4 (Questions 31-35)
    { question: "Wann begann die Weimarer Republik?", options: ["1914", "1919", "1925", "1933"], correct: 1, difficulty: 4 },
    { question: "Wer war der Diktator Italiens im Zweiten Weltkrieg?", options: ["Benito Mussolini", "Franco", "Tito", "Ceausescu"], correct: 0, difficulty: 4 },
    { question: "Wann kam Adolf Hitler an die Macht?", options: ["1933", "1936", "1929", "1939"], correct: 0, difficulty: 4 },
    { question: "Wie hieß das geheime US-Projekt zur Entwicklung der Atombombe?", options: ["Apollo", "Manhattan Project", "Trinity", "Eagle"], correct: 1, difficulty: 4 },
    { question: "Was passierte am 11. September 2001?", options: ["Terroranschläge auf das World Trade Center", "Börsencrash", "Kriegsausbruch", "Friedensvertrag"], correct: 0, difficulty: 4 },
    
    // Level 5 (Questions 36-40)
    { question: "Wer war Nelson Mandela?", options: ["Freiheitskämpfer gegen Apartheid", "Premierminister von Kenia", "Boxer", "US-Präsident"], correct: 0, difficulty: 5 },
    { question: "Wann endete der Zweite Weltkrieg in Europa?", options: ["1944", "1945", "1946", "1947"], correct: 1, difficulty: 5 },
    { question: "Wie hieß der erste Präsident der USA?", options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], correct: 0, difficulty: 5 },
    { question: "Wer war Che Guevara?", options: ["Revolutionär in Kuba", "Diktator in Chile", "General in Mexiko", "Präsident Argentiniens"], correct: 0, difficulty: 5 },
    { question: "Was war der 'Eiserne Vorhang'?", options: ["Grenze zwischen Ost und West im Kalten Krieg", "Mauer in Berlin", "NATO-System", "Funknetzwerk"], correct: 0, difficulty: 5 },
    
    // Level 6-10 (Questions 41-50)
    { question: "Wer malte das Deckenfresko der Sixtinischen Kapelle?", options: ["Leonardo da Vinci", "Michelangelo", "Raffael", "Donatello"], correct: 1, difficulty: 6 },
    { question: "Was war die Magna Carta?", options: ["Freiheitsurkunde Englands (1215)", "Französische Verfassung", "Papstbulle", "Vertrag von Paris"], correct: 0, difficulty: 6 },
    { question: "Welcher Philosoph schrieb 'Der Staat'?", options: ["Platon", "Aristoteles", "Sokrates", "Epikur"], correct: 0, difficulty: 7 },
    { question: "Wann begann der Dreißigjährige Krieg?", options: ["1618", "1628", "1608", "1638"], correct: 0, difficulty: 7 },
    { question: "Wie hieß die Hauptstadt des Byzantinischen Reiches?", options: ["Konstantinopel", "Rom", "Athen", "Antiochia"], correct: 0, difficulty: 7 },
    { question: "Wann wurde das Internet öffentlich zugänglich?", options: ["1989", "1991", "1993", "1995"], correct: 1, difficulty: 8 },
    { question: "Wie hieß der Vertrag, der den Ersten Weltkrieg beendete?", options: ["Versailler Vertrag", "Genfer Abkommen", "Berliner Vertrag", "Jalta-Abkommen"], correct: 0, difficulty: 8 },
    { question: "Wer war Marie Curie?", options: ["Wissenschaftlerin, die Radioaktivität erforschte", "Chemikerin für Impfstoffe", "Philosophin", "Mathematikerin"], correct: 0, difficulty: 9 },
    { question: "Wann trat der Euro als Buchwährung in Kraft?", options: ["1999", "2000", "2002", "1997"], correct: 0, difficulty: 9 },
    { question: "Wer war der erste Mensch auf dem Mond?", options: ["Neil Armstrong", "Buzz Aldrin", "Michael Collins", "Alan Shepard"], correct: 0, difficulty: 10 },
  ],
  medienkritik: [
    // Level 1 (Questions 1-15)
    { question: "Was versteht man unter Medienkritik?", options: ["Das grundlose Misstrauen gegenüber Medien", "Die reflexive Auseinandersetzung mit Medieninhalten und ihrer Wirkung", "Das Sammeln von Fake News", "Das Erstellen eigener Memes"], correct: 1, difficulty: 1 },
    { question: "Warum ist Medienkompetenz wichtig?", options: ["Damit man Werbung besser ignorieren kann", "Um Informationen kritisch zu bewerten und Manipulation zu erkennen", "Nur um journalistisch zu arbeiten", "Damit man mehr Inhalte konsumieren kann"], correct: 1, difficulty: 1 },
    { question: "Was ist mit dem Begriff 'Medienmanipulation' gemeint?", options: ["Technische Probleme bei Medien", "Gezielte Beeinflussung von Wahrnehmung und Meinung durch Medien", "Redaktionelle Korrekturen", "Ein neues Social-Media-Feature"], correct: 1, difficulty: 1 },
    { question: "Was bedeutet 'Fake News'?", options: ["Lustige Satireartikel", "Absichtlich verbreitete Falschinformationen", "Alte Nachrichten", "Nachrichten über Prominente"], correct: 1, difficulty: 1 },
    { question: "Woran erkennt man seriöse Quellen?", options: ["Viele Emojis im Text", "Klare Autorenschaft und überprüfbare Fakten", "Reißerische Überschriften", "Viele Likes auf Social Media"], correct: 1, difficulty: 1 },
    { question: "Was ist eine Filterblase?", options: ["Wenn Inhalte nach Interessen gefiltert werden und andere Perspektiven verschwinden", "Eine App zur Luftfilterung", "Ein Spamfilter", "Eine Art Internetwerbung"], correct: 0, difficulty: 1 },
    { question: "Wie funktioniert der Echokammer-Effekt?", options: ["Man hört immer nur die eigene Meinung bestätigt", "Man bekommt zufällig neue Informationen", "Man verliert das Internet", "Man wird automatisch abgemeldet"], correct: 0, difficulty: 1 },
    { question: "Was bedeutet 'Agenda Setting'?", options: ["Medien entscheiden, über welche Themen gesprochen wird", "Politiker planen Reden", "Werbung wird strategisch platziert", "Es ist ein Kalender-Tool"], correct: 0, difficulty: 1 },
    { question: "Was beschreibt der Begriff 'Framing'?", options: ["Das Einrahmen von Bildern", "Die Art, wie Medien Themen sprachlich deuten und bewerten", "Ein Kamerawinkel in Filmen", "Eine neue Social-Media-Funktion"], correct: 1, difficulty: 1 },
    { question: "Was ist Clickbait?", options: ["Übertriebene, emotionale Überschriften zur Erzeugung von Klicks", "Wissenschaftliche Artikel", "Kurze Nachrichten ohne Quellen", "Werbung für Angler"], correct: 0, difficulty: 1 },
    { question: "Wie finanzieren sich die meisten kostenlosen Online-Medien?", options: ["Durch Steuern", "Durch Werbung und Nutzerdaten", "Durch Spenden", "Durch den Staat"], correct: 1, difficulty: 1 },
    { question: "Was versteht man unter Medienethik?", options: ["Richtlinien für moralisch verantwortlichen Journalismus", "Technik zur Bildbearbeitung", "Ein Gesetz zur Mediennutzung", "Regeln für Influencer-Marketing"], correct: 0, difficulty: 1 },
    { question: "Was ist 'Desinformation' im Unterschied zu 'Misinformation'?", options: ["Desinformation ist absichtlich falsch, Misinformation unbeabsichtigt", "Beide sind gleich", "Misinformation ist gefährlicher", "Desinformation ist Satire"], correct: 0, difficulty: 1 },
    { question: "Was beschreibt der Begriff 'Gatekeeping'?", options: ["Die Entscheidung, welche Inhalte in die Öffentlichkeit gelangen", "Der Schutz von Passwörtern", "Das Schließen von Websites", "Die Moderation von Kommentaren"], correct: 0, difficulty: 1 },
    { question: "Warum ist Transparenz in journalistischer Arbeit wichtig?", options: ["Sie fördert Vertrauen und Nachvollziehbarkeit", "Sie macht Artikel länger", "Sie senkt die Produktionskosten", "Sie ist nur bei Werbung nötig"], correct: 0, difficulty: 1 },
    
    // Level 4 (Questions 16-20)
    { question: "Wie beeinflussen Algorithmen unsere Medienwahrnehmung?", options: ["Sie personalisieren Inhalte und können Meinungsbildung einseitig prägen", "Sie garantieren Objektivität", "Sie löschen Fake News automatisch", "Sie dienen nur technischer Optimierung"], correct: 0, difficulty: 2 },
    { question: "Was ist der Unterschied zwischen öffentlicher und kommerzieller Medienlogik?", options: ["Öffentliche Medien verfolgen Bildungsauftrag, kommerzielle orientieren sich an Profit", "Es gibt keinen Unterschied", "Beide werden vom Staat finanziert", "Kommerzielle Medien sind gemeinnützig"], correct: 0, difficulty: 2 },
    { question: "Wie kann man eigene Mediennutzung kritisch reflektieren?", options: ["Durch regelmäßige Pausen, Quellenprüfung und Perspektivwechsel", "Durch kompletten Verzicht auf Medien", "Durch das Folgen von Trends", "Durch Likes und Shares"], correct: 0, difficulty: 2 },
    { question: "Was beschreibt der Begriff 'Post-Truth'?", options: ["Eine Gesellschaft, in der Emotionen wichtiger sind als Fakten", "Das Ende des Internets", "Eine neue Art Blog", "Politische Transparenz"], correct: 0, difficulty: 2 },
    { question: "Wie kann man als Nutzer:in aktiv zu einer kritischen Medienkultur beitragen?", options: ["Durch eigenes Recherchieren, Quellenprüfen und bewusstes Teilen von Inhalten", "Durch Ignorieren aller Nachrichten", "Durch häufiges Kommentieren", "Durch reines Konsumieren von Kurzvideos"], correct: 0, difficulty: 2 },
    
    // Level 5 (Questions 21-25)
    { question: "Was bedeutet 'Medienkonzentration'?", options: ["Wenn viele Medien in der Hand weniger Eigentümer sind", "Wenn man sich beim Lesen konzentriert", "Wenn Medien besonders laut berichten", "Wenn Medien aus einem Land stammen"], correct: 0, difficulty: 3 },
    { question: "Warum kann Medienkonzentration problematisch sein?", options: ["Sie verringert Meinungsvielfalt", "Sie fördert unabhängigen Journalismus", "Sie verbessert journalistische Qualität", "Sie reduziert Produktionskosten"], correct: 0, difficulty: 3 },
    { question: "Was ist eine journalistische Quelle?", options: ["Eine Person oder ein Dokument, das Informationen liefert", "Eine App für Nachrichten", "Eine PR-Agentur", "Ein anonymer Social-Media-Post"], correct: 0, difficulty: 3 },
    { question: "Warum sind Primärquellen glaubwürdiger als Sekundärquellen?", options: ["Weil sie Informationen direkt und unverfälscht liefern", "Weil sie schöner formatiert sind", "Weil sie mehr Werbung enthalten", "Weil sie auf Social Media erscheinen"], correct: 0, difficulty: 3 },
    { question: "Was ist ein sogenannter 'Deepfake'?", options: ["Ein manipuliertes Audio- oder Video, das echt wirkt", "Eine Falschmeldung in Textform", "Ein Computerspiel", "Eine neue Art Meme"], correct: 0, difficulty: 3 },
    
    // Level 6 (Questions 26-30)
    { question: "Welche Gefahr geht von Deepfakes aus?", options: ["Sie können Vertrauen in echte Bilder und Videos zerstören", "Sie verbessern journalistische Arbeit", "Sie sind harmlos, da leicht erkennbar", "Sie sind nur zu Unterhaltungszwecken da"], correct: 0, difficulty: 3 },
    { question: "Was ist ein 'Shitstorm'?", options: ["Eine Welle negativer Online-Kommentare gegen Personen oder Organisationen", "Eine neue Wetter-App", "Ein Spamfilter", "Eine journalistische Methode"], correct: 0, difficulty: 3 },
    { question: "Wie kann man Fake News erkennen?", options: ["Durch Überprüfung der Quelle, Sprache und Fakten", "Durch emotionale Zustimmung", "Durch viele Likes", "Durch den Schreibstil"], correct: 0, difficulty: 3 },
    { question: "Was bedeutet 'Algorithmische Verzerrung' (Bias)?", options: ["Wenn ein Algorithmus bestimmte Gruppen oder Meinungen bevorzugt", "Wenn ein Algorithmus abstürzt", "Wenn Nutzer:innen zu viele Daten löschen", "Wenn Werbung blockiert wird"], correct: 0, difficulty: 3 },
    { question: "Welche Rolle spielt KI in der Medienproduktion?", options: ["Sie kann Inhalte automatisch generieren und selektieren", "Sie ersetzt menschliche Wahrnehmung vollständig", "Sie hat keinen Einfluss", "Sie wird nur für Werbung genutzt"], correct: 0, difficulty: 3 },
    
    // Level 7 (Questions 31-35)
    { question: "Was bedeutet 'Informationsüberflutung'?", options: ["Zu viele verfügbare Informationen, um sie kritisch zu verarbeiten", "Zu wenig Nachrichten", "Eine Internetstörung", "Zensur"], correct: 0, difficulty: 4 },
    { question: "Warum sind Schlagzeilen oft emotional formuliert?", options: ["Um Aufmerksamkeit zu erzeugen und Klicks zu fördern", "Weil Journalist:innen keine Fakten kennen", "Weil Emotionen neutral sind", "Weil Leser:innen nüchterne Texte ablehnen"], correct: 0, difficulty: 4 },
    { question: "Was bedeutet 'Medienagenda'?", options: ["Die Gesamtheit der Themen, die aktuell in Medien dominieren", "Der Stundenplan von Journalist:innen", "Der Werbeplan einer Zeitung", "Der Social-Media-Algorithmus"], correct: 0, difficulty: 4 },
    { question: "Was ist mit 'Propaganda' gemeint?", options: ["Systematische, emotionale Beeinflussung zur Unterstützung einer Ideologie", "Neutrale Informationsvermittung", "Humorvolle Werbung", "Zufällige Meinungsäußerung"], correct: 0, difficulty: 4 },
    { question: "Wie unterscheidet sich seriöser Journalismus von Boulevardjournalismus?", options: ["Seriöser Journalismus prüft Quellen und informiert sachlich", "Boulevardjournalismus ist objektiver", "Boulevardjournalismus ist langsamer", "Seriöser Journalismus hat keine Meinung"], correct: 0, difficulty: 4 },
    
    // Level 8 (Questions 36-40)
    { question: "Was ist 'Click Farming'?", options: ["Bezahlte Klicks zur künstlichen Steigerung von Reichweite", "Landwirtschaftliche Werbung", "Statistische Erhebung", "Ein Begriff aus der Biologie"], correct: 0, difficulty: 4 },
    { question: "Warum ist Medienvielfalt wichtig für die Demokratie?", options: ["Sie ermöglicht unterschiedliche Perspektiven und kritische Kontrolle", "Sie verwirrt Bürger:innen", "Sie senkt Produktionskosten", "Sie verhindert Innovation"], correct: 0, difficulty: 4 },
    { question: "Was versteht man unter 'Desinformationskampagne'?", options: ["Gezielte, koordinierte Verbreitung falscher Informationen", "Eine Aufklärungskampagne", "Ein Fact-Checking-Projekt", "Ein journalistisches Experiment"], correct: 0, difficulty: 4 },
    { question: "Was ist ein 'Bot' in sozialen Netzwerken?", options: ["Ein automatisiertes Konto, das Inhalte oder Meinungen verbreitet", "Ein Journalist", "Ein Hashtag", "Ein Filter"], correct: 0, difficulty: 4 },
    { question: "Warum ist Quellenkritik zentraler Bestandteil der Medienkritik?", options: ["Weil sie hilft, zwischen Information und Manipulation zu unterscheiden", "Weil sie unnötig Zeit kostet", "Weil sie die Meinungsfreiheit einschränkt", "Weil sie nur für Forscher:innen relevant ist"], correct: 0, difficulty: 4 },
    
    // Level 9 (Questions 41-45)
    { question: "Wie kann Satire zur Medienkritik beitragen?", options: ["Durch humorvolle Übertreibung, die Missstände sichtbar macht", "Durch Verwirrung", "Durch Zensur", "Durch neutrale Nachrichten"], correct: 0, difficulty: 5 },
    { question: "Was ist 'Infotainment'?", options: ["Die Mischung aus Information und Unterhaltung", "Ein Streamingdienst", "Eine Sportshow", "Eine Propagandatechnik"], correct: 0, difficulty: 5 },
    { question: "Welche Verantwortung tragen Influencer:innen?", options: ["Sie sollten Werbung klar kennzeichnen und transparent handeln", "Keine – sie sind keine Journalist:innen", "Nur gegenüber Sponsoren", "Nur gegenüber Fans"], correct: 0, difficulty: 5 },
    { question: "Warum ist Medienbildung auch im Erwachsenenalter wichtig?", options: ["Weil sich Medienstrukturen und Technologien ständig verändern", "Nur Kinder müssen lernen", "Erwachsene sind immun gegen Fake News", "Medienbildung endet mit 18"], correct: 0, difficulty: 5 },
    { question: "Was ist 'Constructive Journalism'?", options: ["Journalismus, der lösungsorientiert berichtet statt nur Probleme zu betonen", "Werbung für Bauprojekte", "Fiktive Nachrichten", "Politische Propaganda"], correct: 0, difficulty: 5 },
    
    // Level 10 (Questions 46-50)
    { question: "Was bedeutet 'Public Value' in der Medienlandschaft?", options: ["Gesellschaftlicher Mehrwert öffentlich-rechtlicher Medien", "Der Aktienwert von Medienunternehmen", "Die Anzahl der Klicks", "Die Reichweite einer Kampagne"], correct: 0, difficulty: 5 },
    { question: "Warum ist Transparenz bei KI-generierten Inhalten wichtig?", options: ["Damit Nutzer:innen erkennen, ob ein Mensch oder eine Maschine Inhalte erstellt hat", "Weil KI immer fehlerfrei ist", "Um Werbung zu vermeiden", "Weil das Design sonst leidet"], correct: 0, difficulty: 5 },
    { question: "Was ist 'Astroturfing'?", options: ["Vortäuschen von Graswurzelbewegungen durch Organisationen oder Unternehmen", "Naturschutz im Internet", "Sportjournalismus", "Social-Media-Werbung"], correct: 0, difficulty: 5 },
    { question: "Warum ist Medienkritik Teil Demokratischer Kultur?", options: ["Weil sie Machtstrukturen sichtbar macht und öffentliche Kontrolle stärkt", "Weil sie Medien abschaffen will", "Weil sie Zensur fördert", "Weil sie nur Journalist:innen betrifft"], correct: 0, difficulty: 5 },
    { question: "Was beschreibt der Begriff 'Digital Literacy'?", options: ["Fähigkeit, digitale Informationen kritisch, kreativ und sicher zu nutzen", "Nur technisches Know-how", "Nur Social-Media-Kompetenz", "Das Lesen von E-Books"], correct: 0, difficulty: 5 },
  ],
  geografie: [
    // Level 1-2 (Easy)
    { question: "Was ist die Hauptstadt von Deutschland?", options: ["München", "Hamburg", "Berlin", "Köln"], correct: 2, difficulty: 1 },
    { question: "Welcher ist der größte Kontinent?", options: ["Afrika", "Europa", "Asien", "Amerika"], correct: 2, difficulty: 1 },
    { question: "Wie viele Kontinente gibt es?", options: ["5", "6", "7", "8"], correct: 2, difficulty: 1 },
    { question: "In welchem Kontinent liegt Deutschland?", options: ["Asien", "Afrika", "Europa", "Amerika"], correct: 2, difficulty: 1 },
    { question: "Was ist ein Ozean?", options: ["Ein Berg", "Ein großes Meer", "Ein Fluss", "Eine Stadt"], correct: 1, difficulty: 1 },
    
    // Level 3-4 (Medium)
    { question: "Welcher ist der längste Fluss der Welt?", options: ["Rhein", "Donau", "Nil", "Amazonas"], correct: 2, difficulty: 2 },
    { question: "Was ist die Hauptstadt von Frankreich?", options: ["London", "Paris", "Rom", "Madrid"], correct: 1, difficulty: 2 },
    { question: "Welcher Berg ist der höchste der Welt?", options: ["Zugspitze", "Kilimandscharo", "Mount Everest", "Mont Blanc"], correct: 2, difficulty: 2 },
    { question: "In welchem Kontinent liegt Ägypten?", options: ["Europa", "Asien", "Afrika", "Australien"], correct: 2, difficulty: 2 },
    { question: "Was ist die Hauptstadt von Italien?", options: ["Venedig", "Mailand", "Rom", "Florenz"], correct: 2, difficulty: 2 },
    
    // Level 5-6 (Medium-Hard)
    { question: "Welches Land hat die meisten Einwohner?", options: ["USA", "Indien", "China", "Russland"], correct: 2, difficulty: 3 },
    { question: "Was ist ein Archipel?", options: ["Ein Berg", "Eine Inselgruppe", "Ein Fluss", "Ein Kontinent"], correct: 1, difficulty: 3 },
    { question: "In welchem Ozean liegt Hawaii?", options: ["Atlantik", "Pazifik", "Indischer Ozean", "Arktischer Ozean"], correct: 1, difficulty: 3 },
    { question: "Was ist die Hauptstadt von Spanien?", options: ["Barcelona", "Sevilla", "Madrid", "Valencia"], correct: 2, difficulty: 3 },
    { question: "Welcher Fluss fließt durch London?", options: ["Seine", "Themse", "Rhein", "Donau"], correct: 1, difficulty: 3 },
    
    // Level 7-8 (Hard)
    { question: "Was ist ein Äquator?", options: ["Ein Berg", "Die Linie bei 0° Breitengrad", "Ein Fluss", "Eine Stadt"], correct: 1, difficulty: 4 },
    { question: "Welches Land hat die meisten Nachbarländer?", options: ["Deutschland", "Frankreich", "China", "Brasilien"], correct: 2, difficulty: 4 },
    { question: "Was ist die Hauptstadt von Australien?", options: ["Sydney", "Melbourne", "Canberra", "Brisbane"], correct: 2, difficulty: 4 },
    { question: "In welcher Klimazone liegt Deutschland?", options: ["Tropen", "Subtropen", "Gemäßigte Zone", "Polarzone"], correct: 2, difficulty: 4 },
    { question: "Was sind Fjorde?", options: ["Berge", "Tiefe Meeresarme", "Wüsten", "Flüsse"], correct: 1, difficulty: 4 },
    
    // Level 9-10 (Very Hard)
    { question: "Welches Land liegt auf zwei Kontinenten?", options: ["Spanien", "Türkei", "Ägypten", "Russland"], correct: 3, difficulty: 5 },
    { question: "Was ist die Hauptstadt von Kanada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], correct: 2, difficulty: 5 },
    { question: "Wie nennt man die imaginäre Linie zwischen Nord- und Südpol?", options: ["Äquator", "Meridian", "Tropen", "Polarkreis"], correct: 1, difficulty: 5 },
    { question: "Welches ist das kleinste Land der Welt?", options: ["Monaco", "Vatikanstadt", "San Marino", "Liechtenstein"], correct: 1, difficulty: 5 },
    { question: "In welchem Land liegt der Amazonas-Regenwald hauptsächlich?", options: ["Peru", "Kolumbien", "Brasilien", "Venezuela"], correct: 2, difficulty: 5 },
  ],
  klimawandel: [
    {
      question: "Was ist der Hauptgrund für den Klimawandel?",
      options: ["Zu viele Bäume", "Treibhausgase wie CO₂", "Zu viel Regen", "Kälte"],
      correct: 1,
      difficulty: 1,
    },
    {
      question: "Welches Gas trägt am meisten zur Erderwärmung bei?",
      options: ["Sauerstoff", "Stickstoff", "CO₂", "Helium"],
      correct: 2,
      difficulty: 1,
    },
    {
      question: "Was passiert durch die globale Erwärmung?",
      options: ["Es wird überall kälter", "Gletscher schmelzen", "Mehr Schnee", "Nichts"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Wie können wir den Klimawandel verlangsamen?",
      options: ["Mehr Auto fahren", "Weniger Energie verbrauchen", "Mehr Plastik nutzen", "Gar nicht"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Was ist der Treibhauseffekt?",
      options: ["Pflanzen wachsen besser", "Gase halten Wärme in der Atmosphäre", "Es regnet mehr", "Nichts besonderes"],
      correct: 1,
      difficulty: 2,
    },
  ],
  technologie: [
    // Level 1 (Questions 1-10)
    { question: "Wofür steht die Abkürzung 'KI'?", options: ["Künstliche Industrie", "Künstliche Intelligenz", "Kritische Information", "Kontrollierte Interaktion"], correct: 1, difficulty: 1 },
    { question: "Wer gilt als 'Vater des Computers'?", options: ["Alan Turing", "Steve Jobs", "Bill Gates", "Charles Babbage"], correct: 0, difficulty: 1 },
    { question: "Welche Programmiersprache wurde speziell für künstliche Intelligenz entwickelt?", options: ["Java", "Python", "C++", "Pascal"], correct: 1, difficulty: 1 },
    { question: "Was bedeutet 'Algorithmus'?", options: ["Schritt-für-Schritt-Anleitung zur Problemlösung", "Hardware-Bauteil", "Passworttyp", "Viruscode"], correct: 0, difficulty: 1 },
    { question: "Was ist eine App?", options: ["Betriebssystem", "Software-Programm", "Hardware-Chip", "Internetbrowser"], correct: 1, difficulty: 1 },
    { question: "Was bezeichnet der Begriff 'Cloud'?", options: ["Wettermodell", "Computerspiel", "Datenspeicherung im Internet", "Virusabwehr"], correct: 2, difficulty: 1 },
    { question: "Was ist ein Smartphone im Vergleich zu einem Handy?", options: ["Ein internetfähiges Gerät mit Betriebssystem", "Nur zum Telefonieren gedacht", "Festnetzgerät", "Spielkonsole"], correct: 0, difficulty: 1 },
    { question: "Was macht eine Suchmaschine wie Google?", options: ["Dateien löschen", "Webseiten finden", "Internetverbindung herstellen", "Werbung blockieren"], correct: 1, difficulty: 1 },
    { question: "Was ist ein 'USB-Stick'?", options: ["Netzwerkgerät", "Datenspeicher", "Lautsprecher", "Software"], correct: 1, difficulty: 1 },
    { question: "Wofür steht 'www' im Internet?", options: ["World Wide Watch", "World Wide Web", "Web Wide World", "Wireless Web"], correct: 1, difficulty: 1 },
    
    // Level 2 (Questions 11-20)
    { question: "Was ist WLAN?", options: ["Kabelloses Netzwerk", "Datenträger", "Energiesystem", "Bluetooth-Ersatz"], correct: 0, difficulty: 2 },
    { question: "Wofür steht 'AI' im Englischen?", options: ["Automated Internet", "Artificial Intelligence", "Assisted Interface", "Auto Input"], correct: 1, difficulty: 2 },
    { question: "Welche Firma entwickelte ChatGPT?", options: ["OpenAI", "Google", "Meta", "Microsoft"], correct: 0, difficulty: 2 },
    { question: "Was ist ein Bot?", options: ["Computervirus", "Automatisiertes Programm", "Cloudspeicher", "App-Design"], correct: 1, difficulty: 2 },
    { question: "Was ist ein Deepfake?", options: ["Musik-Algorithmus", "Suchmaschine", "Manipuliertes KI-Video oder Bild", "Programmiercode"], correct: 2, difficulty: 2 },
    { question: "Was ist ein 'Algorithmus bias'?", options: ["Programmfehler", "Voreingenommenheit in KI-Systemen", "Sicherheitslücke", "Designproblem"], correct: 1, difficulty: 2 },
    { question: "Was versteht man unter 'Big Data'?", options: ["Sehr große Datenmengen", "Kleine Dateien", "Cloud-Ordner", "Speichersticks"], correct: 0, difficulty: 2 },
    { question: "Was ist ein Computer-Virus?", options: ["Medizinisches Problem", "Schädliches Programm", "Suchmaschine", "Datenbank"], correct: 1, difficulty: 2 },
    { question: "Was ist ein 'Browser'?", options: ["Programm zum Surfen im Internet", "Antiviren-Tool", "Dateityp", "App-Shop"], correct: 0, difficulty: 2 },
    { question: "Was ist ein QR-Code?", options: ["Quadratischer Strichcode für digitale Informationen", "Computervirus", "WLAN-Signal", "Dateiformat"], correct: 0, difficulty: 2 },
    
    // Level 3 (Questions 21-30)
    { question: "Was versteht man unter 'Machine Learning'?", options: ["Menschliches Lernen", "Computer lernen aus Daten", "Robotertraining", "Cloudspeicherung"], correct: 1, difficulty: 3 },
    { question: "Was ist 'Deep Learning'?", options: ["Lernen mit neuronalen Netzwerken", "Physikalisches Rechnen", "Datenkompression", "Emotionserkennung"], correct: 0, difficulty: 3 },
    { question: "Wofür steht die Abkürzung 'GPU'?", options: ["General Process Unit", "Graphics Processing Unit", "Global Program Utility", "Graphic Plug-Up"], correct: 1, difficulty: 3 },
    { question: "Was bezeichnet man als 'Turing-Test'?", options: ["Test, ob KI wie ein Mensch kommuniziert", "Hardwareprüfung", "IQ-Test", "Sprachprüfung"], correct: 0, difficulty: 3 },
    { question: "Was ist ein neuronales Netz?", options: ["KI-Modell, das dem menschlichen Gehirn nachempfunden ist", "Netzwerk aus Computern", "Soziales Medium", "Datenbank"], correct: 0, difficulty: 3 },
    { question: "Was versteht man unter 'Open Source'?", options: ["Frei zugänglicher Programmcode", "Geschlossene Software", "Internetverbindung", "Cloudspeicher"], correct: 0, difficulty: 3 },
    { question: "Was ist ein Algorithmus in der KI?", options: ["Mathematische Regel zur Entscheidungsfindung", "Hardwarekomponente", "Datenbankstruktur", "Textdatei"], correct: 0, difficulty: 3 },
    { question: "Was ist ein Chatbot?", options: ["Hackerprogramm", "KI-Programm für Gespräche", "Virenschutz", "Audio-Player"], correct: 1, difficulty: 3 },
    { question: "Wofür steht die Abkürzung 'CPU'?", options: ["Central Processing Unit", "Control Power Unit", "Core Programming Utility", "Central Plug Unit"], correct: 0, difficulty: 3 },
    { question: "Was ist ein Sensor?", options: ["Gerät, das Umweltreize misst", "Speicherchip", "Batterie", "Schaltkreis"], correct: 0, difficulty: 3 },
    
    // Level 4 (Questions 31-35)
    { question: "Was ist Quantencomputing?", options: ["Klassisches Rechnen", "Nutzung von Quantenmechanik zur Datenverarbeitung", "Cloudspeichertechnik", "Grafikberechnung"], correct: 1, difficulty: 4 },
    { question: "Was ist eine Blockchain?", options: ["Cloudservice", "Fälschungssichere Datenkette", "Social-Media-Tool", "Suchmaschine"], correct: 1, difficulty: 4 },
    { question: "Was ist ein autonomes System?", options: ["System, das ohne menschliche Steuerung arbeitet", "Funknetzwerk", "Betriebssystem", "App-Store"], correct: 0, difficulty: 4 },
    { question: "Was bedeutet 'IoT' (Internet of Things)?", options: ["Vernetzung von Alltagsgeräten", "Neues Social Network", "Stromnetz", "Softwarefehler"], correct: 0, difficulty: 4 },
    { question: "Was ist ein digitaler Zwilling ('Digital Twin')?", options: ["Virtueller Avatar", "Digitale Nachbildung eines realen Objekts", "Roboterkopie", "KI-Trainer"], correct: 1, difficulty: 4 },
    
    // Level 5 (Questions 36-40)
    { question: "Was bedeutet 'Cybersicherheit'?", options: ["Schutz von Daten und Netzwerken", "Cloudspeicherung", "Online-Verkauf", "Webdesign"], correct: 0, difficulty: 5 },
    { question: "Was ist ein 'Algorithmic Bias'?", options: ["Rechenfehler", "Verzerrung durch Trainingsdaten in KI", "Hardwaredefekt", "Code-Wiederholung"], correct: 1, difficulty: 5 },
    { question: "Was ist ein Botnetz?", options: ["Verbund gehackter Computer", "Soziales Netzwerk", "WLAN-System", "KI-Server"], correct: 0, difficulty: 5 },
    { question: "Was ist ein autonomes Fahrzeug?", options: ["Auto, das selbstständig fährt", "Elektroauto", "Hybridauto", "Flugtaxi"], correct: 0, difficulty: 5 },
    { question: "Was ist eine API?", options: ["Schnittstelle zwischen Programmen", "Sicherheitssoftware", "Passwortsystem", "Datenvirus"], correct: 0, difficulty: 5 },
    
    // Level 6-10 (Questions 41-50)
    { question: "Was versteht man unter 'Singularität' in der KI?", options: ["Punkt, an dem KI die menschliche Intelligenz übertrifft", "Netzwerkstörung", "Quantenfehler", "Serverüberlastung"], correct: 0, difficulty: 6 },
    { question: "Was ist eine 'Black Box' bei KI-Systemen?", options: ["Undurchsichtige Entscheidungslogik", "Back-Up-Festplatte", "Sicherheitsmodul", "Serverraum"], correct: 0, difficulty: 6 },
    { question: "Was bedeutet 'Augmented Reality' (AR)?", options: ["Virtuelle Welt ohne Realität", "Erweiterte Realität durch digitale Inhalte", "3D-Brillenfehler", "Computeranimation"], correct: 1, difficulty: 7 },
    { question: "Was versteht man unter 'Ethik in der KI'?", options: ["Moralische Regeln für den Umgang mit KI", "Programmiersprache", "Sicherheitssoftware", "Wirtschaftsstrategie"], correct: 0, difficulty: 7 },
    { question: "Was ist ein 'Deep Neural Network'?", options: ["Mehrschichtiges neuronales Netz", "Soziale Plattform", "Hardwaremodul", "Virenschutz"], correct: 0, difficulty: 8 },
    { question: "Was bedeutet 'OpenAI' im Namen der Firma?", options: ["Offene, zugängliche KI-Forschung", "Geschlossene KI-Firma", "Quantenhardware", "Soziales Netzwerk"], correct: 0, difficulty: 8 },
    { question: "Was ist ein Prompt in ChatGPT?", options: ["Passwort", "Eingabeaufforderung", "Algorithmusname", "Sprachbefehl"], correct: 1, difficulty: 9 },
    { question: "Was ist ein Large Language Model (LLM)?", options: ["KI-Modell für Sprachverarbeitung", "Cloudspeicher", "Übersetzungssoftware", "Robotercode"], correct: 0, difficulty: 9 },
    { question: "Was bedeutet 'AGI' (Artificial General Intelligence)?", options: ["KI mit menschlichem Denkvermögen", "KI-Chatbot", "Spiel-KI", "Datenbank"], correct: 0, difficulty: 10 },
    { question: "Was ist ein mögliches Risiko zukünftiger KI?", options: ["Mehr Freizeit", "Arbeitsplatzverlust und Missbrauch", "Bessere Witze", "Mehr Rechenleistung"], correct: 1, difficulty: 10 },
  ],
  sport: [
    // Level 1 (Questions 1-10)
    { question: "Wie viele Spieler stehen beim Fußball pro Team auf dem Feld?", options: ["9", "11", "10", "12"], correct: 1, difficulty: 1 },
    { question: "Wie viele Minuten dauert ein reguläres Fußballspiel?", options: ["80", "90", "100", "70"], correct: 1, difficulty: 1 },
    { question: "Welche Farbe hat die Zielflagge im Motorsport?", options: ["Rot", "Schwarz-weiß kariert", "Gelb", "Blau"], correct: 1, difficulty: 1 },
    { question: "Wie viele Ringe hat das olympische Symbol?", options: ["5", "4", "6", "7"], correct: 0, difficulty: 1 },
    { question: "In welchem Land wurde Fußball erfunden?", options: ["Deutschland", "England", "Frankreich", "Brasilien"], correct: 1, difficulty: 1 },
    { question: "Wie nennt man den Schlag im Tennis, der das Spiel eröffnet?", options: ["Aufschlag", "Volley", "Slice", "Rückhand"], correct: 0, difficulty: 1 },
    { question: "Welche Sportart wird bei Wimbledon gespielt?", options: ["Tennis", "Golf", "Cricket", "Rugby"], correct: 0, difficulty: 1 },
    { question: "Wie viele Punkte gibt es für einen Sieg im Fußball-Ligaspiel?", options: ["3", "2", "1", "4"], correct: 0, difficulty: 1 },
    { question: "Welche Sportart betreibt Lewis Hamilton?", options: ["Radsport", "Formel 1", "Rallye", "Motocross"], correct: 1, difficulty: 1 },
    { question: "Wie viele Spieler hat ein Basketball-Team gleichzeitig auf dem Feld?", options: ["4", "5", "6", "7"], correct: 1, difficulty: 1 },
    
    // Level 2 (Questions 11-20)
    { question: "In welcher Stadt fanden die Olympischen Spiele 2016 statt?", options: ["London", "Rio de Janeiro", "Tokio", "Paris"], correct: 1, difficulty: 2 },
    { question: "Wie viele Sätze muss man im Volleyball gewinnen, um ein Match zu gewinnen?", options: ["3", "2", "4", "5"], correct: 0, difficulty: 2 },
    { question: "Was zeigt eine rote Karte im Fußball an?", options: ["Verwarnung", "Auswechslung", "Platzverweis", "Elfmeter"], correct: 2, difficulty: 2 },
    { question: "Wie viele Löcher hat ein Standard-Golfplatz?", options: ["12", "18", "9", "24"], correct: 1, difficulty: 2 },
    { question: "Was ist Abseits im Fußball?", options: ["Spieler steht näher zum Tor als Ball und vorletzter Verteidiger beim Pass", "Ball geht ins Aus", "Foul", "Handspiel"], correct: 0, difficulty: 2 },
    { question: "Wie lang ist ein Marathon?", options: ["42,195 km", "40 km", "45 km", "38 km"], correct: 0, difficulty: 2 },
    { question: "Wie heißt das größte Fußballturnier der Welt?", options: ["UEFA Champions League", "FIFA Weltmeisterschaft", "Copa América", "EM"], correct: 1, difficulty: 2 },
    { question: "Wie nennt man den Punktestand 40:40 im Tennis?", options: ["Einstand", "Vorteil", "Breakball", "Matchball"], correct: 0, difficulty: 2 },
    { question: "In welcher Sportart gibt es 'Strike' und 'Spare'?", options: ["Baseball", "Bowling", "Cricket", "Darts"], correct: 1, difficulty: 2 },
    { question: "Wie viele Runden hat ein 400-Meter-Lauf im Stadion?", options: ["1", "2", "4", "0,5"], correct: 0, difficulty: 2 },
    
    // Level 3 (Questions 21-30)
    { question: "Wer gewann die Fußball-WM 2014?", options: ["Deutschland", "Brasilien", "Argentinien", "Spanien"], correct: 0, difficulty: 3 },
    { question: "Wie viele Grand-Slam-Turniere gibt es im Tennis?", options: ["4", "3", "5", "6"], correct: 0, difficulty: 3 },
    { question: "Welche Disziplin gehört nicht zur Leichtathletik?", options: ["Kugelstoßen", "Fechten", "Weitsprung", "Speerwurf"], correct: 1, difficulty: 3 },
    { question: "Wer war der erste Mensch auf dem Mond (nicht direkt Sport, aber Wissenstest)?", options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"], correct: 0, difficulty: 3 },
    { question: "Wie heißt die höchste Spielklasse im deutschen Eishockey?", options: ["DEL 2", "DEL", "Bundesliga", "EHL"], correct: 1, difficulty: 3 },
    { question: "Welche Sportlerin wird 'GOAT' im Tennis genannt?", options: ["Serena Williams", "Steffi Graf", "Naomi Osaka", "Iga Świątek"], correct: 0, difficulty: 3 },
    { question: "Wie heißt der erfolgreichste Olympionike aller Zeiten?", options: ["Michael Phelps", "Usain Bolt", "Carl Lewis", "Mark Spitz"], correct: 0, difficulty: 3 },
    { question: "Wie viele Spieler stehen beim Handball pro Team auf dem Feld?", options: ["7", "6", "8", "9"], correct: 0, difficulty: 3 },
    { question: "Welche Stadt ist Heimat des Fußballclubs FC Barcelona?", options: ["Barcelona", "Madrid", "Sevilla", "Valencia"], correct: 0, difficulty: 3 },
    { question: "Wie heißt der Pokal der Basketball-NBA?", options: ["Larry-O'Brien Trophy", "Stanley Cup", "Super Bowl Trophy", "World Series Trophy"], correct: 0, difficulty: 3 },
    
    // Level 4 (Questions 31-35)
    { question: "Wie viele Gewichte gibt es im olympischen Boxen (Männer)?", options: ["8", "13", "10", "6"], correct: 1, difficulty: 4 },
    { question: "Welche Sportart verwendet den Begriff 'Bogey'?", options: ["Baseball", "Golf", "Cricket", "Rugby"], correct: 1, difficulty: 4 },
    { question: "Wie viele Spieler sind bei einem Rugby-Union-Team gleichzeitig auf dem Feld?", options: ["15", "11", "13", "9"], correct: 0, difficulty: 4 },
    { question: "Welches Land gewann die erste Fußball-WM 1930?", options: ["Uruguay", "Argentinien", "Brasilien", "Italien"], correct: 0, difficulty: 4 },
    { question: "Was ist ein 'Triple-Double' im Basketball?", options: ["zweistellige Werte in drei Kategorien", "drei Dreipunktewürfe", "drei Fouls", "drei Overtime-Siege"], correct: 0, difficulty: 4 },
    
    // Level 5 (Questions 36-40)
    { question: "Welche Sportart nutzt ein Shuttlecock?", options: ["Squash", "Badminton", "Tennis", "Tischtennis"], correct: 1, difficulty: 5 },
    { question: "Wie hoch ist ein Basketballkorb?", options: ["2,80 m", "3,05 m", "2,90 m", "3,50 m"], correct: 1, difficulty: 5 },
    { question: "Wie viele Spieler sind bei einer Baseball-Mannschaft gleichzeitig auf dem Feld?", options: ["8", "9", "10", "11"], correct: 1, difficulty: 5 },
    { question: "Wie viele Schuss hat man im Biathlon-Rennen pro Runde?", options: ["5", "10", "8", "6"], correct: 0, difficulty: 5 },
    { question: "Welcher Boxer trug den Spitznamen 'The Greatest'?", options: ["Muhammad Ali", "Mike Tyson", "Joe Frazier", "George Foreman"], correct: 0, difficulty: 5 },
    
    // Level 6-10 (Questions 41-50)
    { question: "Was bedeutet 'VAR' im Fußball?", options: ["Video Assistant Referee", "Virtual Athlete Replay", "Visual Arena Review", "View Angle Report"], correct: 0, difficulty: 6 },
    { question: "Wie viele Teams spielen in der NFL-Regular-Season (2025)?", options: ["32", "28", "30", "34"], correct: 0, difficulty: 6 },
    { question: "Welche Stadt war Gastgeber der ersten modernen Olympischen Spiele (1896)?", options: ["Athen", "London", "Paris", "Rom"], correct: 0, difficulty: 7 },
    { question: "Welche Nation hat die meisten Goldmedaillen bei Olympischen Spielen?", options: ["USA", "China", "Russland", "Deutschland"], correct: 0, difficulty: 7 },
    { question: "Welche Fußballregel wurde 1992 eingeführt, um Zeitspiel zu verhindern?", options: ["Rückpassregel", "Abseitsregel", "Gelb-Rot", "VAR"], correct: 0, difficulty: 8 },
    { question: "Wie viele Punkte gibt ein Touchdown im American Football?", options: ["4", "6", "5", "7"], correct: 1, difficulty: 8 },
    { question: "Wer gewann die erste Fußball-EM (1960)?", options: ["Sowjetunion", "Spanien", "Italien", "Deutschland"], correct: 0, difficulty: 9 },
    { question: "Wie viele Etappen hat traditionell die Tour de France?", options: ["19", "21", "22", "20"], correct: 1, difficulty: 9 },
    { question: "Welcher Fußballspieler wurde als 'El Pulga' bekannt?", options: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Mbappé"], correct: 0, difficulty: 10 },
    { question: "Was ist Doping im Sport?", options: ["Verbotene Leistungssteigerung", "Ausdauertraining", "Höhentraining", "Schmerztherapie"], correct: 0, difficulty: 10 },
  ],
  math: [
    {
      question: "Was ist 5 + 3?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      difficulty: 1,
    },
    {
      question: "Was ist 10 - 4?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      difficulty: 1,
    },
    {
      question: "Was ist 7 × 2?",
      options: ["12", "14", "16", "18"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Was ist 15 ÷ 3?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      difficulty: 2,
    },
    {
      question: "Was ist 8 × 7?",
      options: ["54", "56", "64", "48"],
      correct: 1,
      difficulty: 3,
    },
  ],
  language: [
    // Level 1 (Questions 1-10)
    { question: "Welche Sprache spricht man in Spanien?", options: ["Französisch", "Italienisch", "Portugiesisch", "Spanisch"], correct: 3, difficulty: 1 },
    { question: "Welche Sprache wird in Brasilien gesprochen?", options: ["Portugiesisch", "Englisch", "Spanisch", "Französisch"], correct: 0, difficulty: 1 },
    { question: "Welche Sprache ist in Malta Amtssprache?", options: ["Italienisch", "Maltesisch", "Arabisch", "Englisch"], correct: 1, difficulty: 1 },
    { question: "Wie sagt man auf Englisch 'Danke'?", options: ["Merci", "Thank you", "Gracias", "Danke"], correct: 1, difficulty: 1 },
    { question: "In welchem Land ist Französisch Amtssprache?", options: ["Griechenland", "Spanien", "Frankreich", "Belgien"], correct: 2, difficulty: 1 },
    { question: "Welche Sprache spricht man in Japan?", options: ["Koreanisch", "Japanisch", "Vietnamesisch", "Chinesisch"], correct: 1, difficulty: 1 },
    { question: "Welche Sprache hat weltweit die meisten Muttersprachler?", options: ["Mandarin-Chinesisch", "Englisch", "Spanisch", "Hindi"], correct: 0, difficulty: 1 },
    { question: "Welche Sprache spricht man in Mexiko?", options: ["Portugiesisch", "Spanisch", "Englisch", "Nahuatl"], correct: 1, difficulty: 1 },
    { question: "Welche Sprache benutzt das kyrillische Alphabet?", options: ["Ungarisch", "Russisch", "Polnisch", "Tschechisch"], correct: 1, difficulty: 1 },
    { question: "Welche Sprache wird in Österreich gesprochen?", options: ["Ungarisch", "Deutsch", "Französisch", "Englisch"], correct: 1, difficulty: 1 },

    // Level 2 (Questions 11-20)
    { question: "Welche Sprache spricht man in den Niederlanden?", options: ["Deutsch", "Niederländisch", "Flämisch", "Friesisch"], correct: 1, difficulty: 2 },
    { question: "In welchem Land ist Schwedisch Amtssprache?", options: ["Schweden", "Norwegen", "Finnland", "Dänemark"], correct: 0, difficulty: 2 },
    { question: "Welche Sprache spricht man in Argentinien?", options: ["Englisch", "Spanisch", "Italienisch", "Portugiesisch"], correct: 1, difficulty: 2 },
    { question: "Welche zwei Sprachen sind in Kanada Amtssprachen?", options: ["Englisch & Spanisch", "Englisch & Französisch", "Englisch & Niederländisch", "Französisch & Deutsch"], correct: 1, difficulty: 2 },
    { question: "Welche Sprache wird in der Schweiz neben Deutsch gesprochen?", options: ["Schwedisch", "Französisch", "Niederländisch", "Serbisch"], correct: 1, difficulty: 2 },
    { question: "Welche Sprache spricht man in Griechenland?", options: ["Griechisch", "Italienisch", "Arabisch", "Türkisch"], correct: 0, difficulty: 2 },
    { question: "Welche Sprache hat das größte Alphabet?", options: ["Tamil", "Arabisch", "Khmer", "Chinesisch"], correct: 2, difficulty: 2 },
    { question: "Wie heißt die Sprache, die in Israel gesprochen wird?", options: ["Aramäisch", "Persisch", "Hebräisch", "Arabisch"], correct: 2, difficulty: 2 },
    { question: "In welchem Land ist Arabisch nicht Amtssprache?", options: ["Ägypten", "Türkei", "Saudi-Arabien", "Marokko"], correct: 1, difficulty: 2 },
    { question: "Wie heißt die Amtssprache Indiens neben Englisch?", options: ["Hindi", "Urdu", "Bengali", "Tamil"], correct: 0, difficulty: 2 },

    // Level 3 (Questions 21-30)
    { question: "Welche Sprache wird als 'Sprache des Feuers' in Island bezeichnet?", options: ["Norwegisch", "Isländisch", "Gälisch", "Schwedisch"], correct: 1, difficulty: 3 },
    { question: "Aus welcher Sprache stammt das Wort 'Kaffee' ursprünglich?", options: ["Arabisch", "Italienisch", "Türkisch", "Persisch"], correct: 0, difficulty: 3 },
    { question: "Welche Sprache gilt als die älteste noch gesprochene Sprache?", options: ["Hebräisch", "Griechisch", "Tamil", "Latein"], correct: 2, difficulty: 3 },
    { question: "In welchem Land spricht man Bahasa Indonesia?", options: ["Philippinen", "Indonesien", "Brunei", "Malaysia"], correct: 1, difficulty: 3 },
    { question: "Welche Sprache ist nicht indogermanisch?", options: ["Französisch", "Deutsch", "Finnisch", "Persisch"], correct: 2, difficulty: 3 },
    { question: "Wie heißt die romanische Sprache in Rumänien?", options: ["Rumänisch", "Sardisch", "Italienisch", "Moldauisch"], correct: 0, difficulty: 3 },
    { question: "Welche Sprache ist dem Katalanischen am ähnlichsten?", options: ["Spanisch", "Okzitanisch", "Französisch", "Portugiesisch"], correct: 1, difficulty: 3 },
    { question: "Welche Sprache hat die meisten Muttersprachler in Afrika?", options: ["Amharisch", "Swahili", "Hausa", "Arabisch"], correct: 1, difficulty: 3 },
    { question: "Wie nennt man die alte Sprache der Wikinger?", options: ["Altnordisch", "Gotisch", "Altenglisch", "Runisch"], correct: 0, difficulty: 3 },
    { question: "Welche Sprache wird in Pakistan neben Englisch offiziell verwendet?", options: ["Punjabi", "Urdu", "Paschtu", "Sindhi"], correct: 1, difficulty: 3 },

    // Level 4 (Questions 31-40)
    { question: "In welcher Schrift wird Hindi geschrieben?", options: ["Devanagari", "Tamil", "Urdu", "Sanskrit"], correct: 0, difficulty: 4 },
    { question: "Welche Sprache spricht man im Iran?", options: ["Arabisch", "Persisch (Farsi)", "Paschtu", "Kurdisch"], correct: 1, difficulty: 4 },
    { question: "Welche Sprache kennt keine Verbkonjugationen?", options: ["Chinesisch", "Japanisch", "Türkisch", "Englisch"], correct: 0, difficulty: 4 },
    { question: "Amtssprache des Byzantinischen Reichs?", options: ["Latein", "Griechisch", "Aramäisch", "Arabisch"], correct: 1, difficulty: 4 },
    { question: "Wie nennt man die gemeinsame Sprache Ex-Jugoslawiens?", options: ["Serbokroatisch", "Bosnisch", "Montenegrinisch", "Slowenisch"], correct: 0, difficulty: 4 },
    { question: "Schwierigste Sprache laut Foreign Service Institute (FSI)?", options: ["Deutsch", "Norwegisch", "Arabisch", "Spanisch"], correct: 2, difficulty: 4 },
    { question: "Wie heißt die erfundene internationale Sprache?", options: ["Klingonisch", "Esperanto", "Interlingua", "Latinum"], correct: 1, difficulty: 4 },
    { question: "Welche Sprache hat weltweit die meisten Dialekte?", options: ["Arabisch", "Englisch", "Spanisch", "Hindi"], correct: 0, difficulty: 4 },
    { question: "Welche Sprache wurde 1994 in Südafrika neu Amtssprache?", options: ["isiZulu", "Afrikaans", "Englisch", "Xhosa"], correct: 0, difficulty: 4 },
    { question: "Welche Sprache spricht man in Tibet?", options: ["Burmesisch", "Tibetisch", "Nepali", "Mandarin"], correct: 1, difficulty: 4 },

    // Level 5 (Questions 41-50)
    { question: "Verwaltungssprache des Römischen Reiches?", options: ["Koptisch", "Griechisch", "Latein", "Italienisch"], correct: 2, difficulty: 5 },
    { question: "Wie heißt die isolierte Sprache im Baskenland?", options: ["Baskisch", "Galicisch", "Katalanisch", "Bretonisch"], correct: 0, difficulty: 5 },
    { question: "In welchem Land ist Quechua Amtssprache neben Spanisch?", options: ["Ecuador", "Peru", "Chile", "Bolivien"], correct: 1, difficulty: 5 },
    { question: "Welche Sprache nutzt Klick-Laute?", options: ["Swati", "Tswana", "Xhosa", "Zulu"], correct: 2, difficulty: 5 },
    { question: "Erste Sprache, die von Computern verarbeitet wurde?", options: ["Englisch", "Russisch", "Deutsch", "Französisch"], correct: 0, difficulty: 5 },
    { question: "Sprache mit den meisten offiziellen Ländern?", options: ["Französisch", "Englisch", "Arabisch", "Spanisch"], correct: 1, difficulty: 5 },
    { question: "Welche Sprache inspirierte Tolkien zu Elbisch?", options: ["Finnisch", "Walisisch", "Latein", "Irisch"], correct: 0, difficulty: 5 },
    { question: "Welche Sprache ist in Belgien nicht Amtssprache?", options: ["Englisch", "Französisch", "Niederländisch", "Deutsch"], correct: 0, difficulty: 5 },
    { question: "Wie heißt die Kunstsprache aus Star Trek?", options: ["Klingonisch", "Dothraki", "Na'vi", "Elbisch"], correct: 0, difficulty: 5 },
    { question: "Welche Sprache ist alleinige Amtssprache eines Landes auf zwei Kontinenten?", options: ["Arabisch", "Russisch", "Türkisch", "Griechisch"], correct: 2, difficulty: 5 },
  ],
  nature: [
    {
      question: "Was brauchen Pflanzen zum Wachsen?",
      options: ["Nur Wasser", "Wasser, Licht und Luft", "Nur Erde", "Nichts"],
      correct: 1,
      difficulty: 1,
    },
    {
      question: "Welches ist der größte Planet in unserem Sonnensystem?",
      options: ["Erde", "Mars", "Jupiter", "Saturn"],
      correct: 2,
      difficulty: 1,
    },
    {
      question: "Was produzieren Bäume?",
      options: ["CO₂", "Sauerstoff", "Wasser", "Steine"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Wie nennt man Tiere, die nur Pflanzen fressen?",
      options: ["Fleischfresser", "Pflanzenfresser", "Allesfresser", "Insektenfresser"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Was ist Photosynthese?",
      options: ["Atmung von Tieren", "Pflanzen erzeugen Energie aus Licht", "Verdauung", "Schlafen"],
      correct: 1,
      difficulty: 3,
    },
  ],
  art: [
    {
      question: "Wer malte die Mona Lisa?",
      options: ["Picasso", "Van Gogh", "Leonardo da Vinci", "Rembrandt"],
      correct: 2,
      difficulty: 1,
    },
    {
      question: "Was sind Primärfarben?",
      options: ["Rot, Gelb, Blau", "Grün, Lila, Orange", "Schwarz, Weiß", "Alle Farben"],
      correct: 0,
      difficulty: 1,
    },
    {
      question: "Welcher Künstler schnitt sich das Ohr ab?",
      options: ["Monet", "Van Gogh", "Picasso", "Dalí"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Was ist eine Skulptur?",
      options: ["Ein Gemälde", "Ein dreidimensionales Kunstwerk", "Ein Foto", "Ein Lied"],
      correct: 1,
      difficulty: 2,
    },
    {
      question: "Welche Kunstrichtung zeigt Dinge nicht realistisch?",
      options: ["Realismus", "Abstrakte Kunst", "Fotorealismus", "Portrait"],
      correct: 1,
      difficulty: 3,
    },
  ],
};

export default function TopicDetail() {
  const { topicId, levelId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([]);
  const [isReviewPhase, setIsReviewPhase] = useState(false);
  const [showGreenFlash, setShowGreenFlash] = useState(false);
  const [showXPScreen, setShowXPScreen] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    if (!showXPScreen) return;
    const topicKey = topicId || "medienkritik";
    const timer = window.setTimeout(() => {
      navigate(`/topic/${topicKey}`);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [showXPScreen, navigate, topicId]);

  useEffect(() => {
    // Map route topic IDs to quizData keys
    const topicKeyMap: Record<string, string> = {
      history: "geschichte",
      ai: "technologie",
      // direct matches stay the same
      sport: "sport",
      medienkritik: "medienkritik",
      geografie: "geografie",
      klimawandel: "klimawandel",
      math: "math",
      art: "art",
      nature: "nature",
      language: "language",
    };

    const resolvedKey = topicKeyMap[topicId || "medienkritik"] || (topicId || "medienkritik");
    const allQuestions = quizData[resolvedKey] || quizData.medienkritik;
    const level = parseInt(levelId || "1");
    
    // Select 5 questions based on level difficulty
    const minDifficulty = Math.max(1, Math.floor((level - 1) / 2) + 1);
    const maxDifficulty = Math.min(5, Math.ceil(level / 2) + 1);
    
    const levelQuestions = allQuestions.filter(
      q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty
    );
    
    // Shuffle and pick 5 questions
    const shuffled = [...levelQuestions].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 5);
    
    // If not enough questions, fill with random questions from the topic
    while (selected.length < 5 && allQuestions.length > 0) {
      const randomQ = allQuestions[Math.floor(Math.random() * allQuestions.length)];
      if (!selected.includes(randomQ)) {
        selected.push(randomQ);
      }
    }
    
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setCorrectAnswers(0);
    setWrongQuestions([]);
    setIsReviewPhase(false);
  }, [topicId, levelId]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;
    setShowResult(true);

    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      // Green flash effect
      setShowGreenFlash(true);
      setTimeout(() => setShowGreenFlash(false), 300);
    } else {
      // Track wrong questions for review
      if (!isReviewPhase) {
        setWrongQuestions([...wrongQuestions, currentQuestionIndex]);
      }
    }

    toast({
      title: isCorrect ? "Richtig! 🎉" : "Nicht ganz...",
      description: isCorrect ? "+10 XP verdient!" : "Versuch's nochmal am Ende!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

    const handleNext = async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Check, ob wir falsche Fragen wiederholen müssen
      if (!isReviewPhase && wrongQuestions.length > 0) {
        // Review-Phase starten
        setIsReviewPhase(true);
        const wrongQs = wrongQuestions.map((idx) => questions[idx]);
        setQuestions(wrongQs);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        toast({
          title: "Wiederholung! 🔄",
          description: `Lass uns die ${wrongQuestions.length} falschen Fragen nochmal versuchen!`,
        });
      } else {
        // Level abgeschlossen – XP-Screen anzeigen
        const xp = 60;
        setEarnedXP(xp);
        setShowXPScreen(true);

        // 1) Fortschritt lokal speichern
        try {
          const topicKey = topicId || "medienkritik";
          const levelKey = String(levelId || "1");
          const isNewCompletion = addCompletedLevel(topicKey, levelKey);
          if (isNewCompletion) {
            addProgressEntry(topicKey, levelKey);
          }
        } catch (error) {
          console.error("Error saving progress:", error);
          toast({
            title: "Fehler",
            description: "Fortschritt konnte lokal nicht gespeichert werden.",
            variant: "destructive",
          });
        }

      }
    }
  };
    const getButtonStyle = (index: number) => {
    // Noch keine Auswertung: ausgewählte Antwort leicht hervorgehoben
    if (!showResult) {
      return selectedAnswer === index
        ? "border-2 border-purple-500 bg-purple-50"
        : "border-2 border-border hover:border-purple-300";
    }

    // Auswertung aktiv
    if (index === currentQuestion.correct) {
      // richtige Antwort klar grün markieren
      return "border-2 border-emerald-500 bg-emerald-50";
    }

    if (index === selectedAnswer && selectedAnswer !== currentQuestion.correct) {
      // falsch gewählte Antwort rot markieren
      return "border-2 border-red-400 bg-red-50";
    }

    // alle anderen Antworten abdunkeln
    return "border-2 border-border opacity-50";
  };

  const motivationalMessages = [
    "I'm proud of you",
    "Keep learning",
    "Keep growing",
    "Knowledge is king",
    "The elephant always remembers"
  ];
  
  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  if (showXPScreen) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
        <Card className="p-12 text-center animate-scale-in max-w-md w-full">
          <img 
            src={elephantIcon} 
            alt="Elephant" 
            className="w-32 h-32 mx-auto mb-4 animate-bounce"
          />
          <p className="text-xl font-semibold text-primary mb-6 animate-fade-in">
            {randomMessage}
          </p>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Level geschafft!
          </h1>
          <p className="text-6xl font-bold text-primary mb-2">+{earnedXP} XP</p>
          <p className="text-lg text-muted-foreground">Fantastisch gemacht! 🎉</p>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <>
      {/* Green flash overlay */}
      {showGreenFlash && (
        <div className="fixed inset-0 bg-success/20 z-50 animate-fade-out pointer-events-none" />
      )}
      
      <div className="min-h-screen gradient-hero">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
          <div className="flex items-center gap-3 animate-fade-in">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold capitalize">
                Level {levelId} {isReviewPhase && "- Wiederholung"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Frage {currentQuestionIndex + 1} von {totalQuestions}
              </p>
            </div>
          </div>

        {/* Progress */}
        <Progress value={((currentQuestionIndex + 1) / totalQuestions) * 100} className="animate-fade-in" />

        {/* Question Card */}
        <Card className="p-8 animate-scale-in">
          <h2 className="text-xl font-bold mb-6">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all ${getButtonStyle(index)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && index === currentQuestion.correct && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                  {showResult && index === selectedAnswer && selectedAnswer !== currentQuestion.correct && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {!showResult ? (
              <Button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="w-full gradient-primary text-white border-0"
                size="lg"
              >
                Antworten
              </Button>
                        ) : (
              <Button
                onClick={handleNext}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-2xl shadow-md"
                size="lg"
              >
                {currentQuestionIndex < totalQuestions - 1 ? "Nächste Frage" : "Weiter"}
              </Button>
            )}
          </div>
        </Card>
      </div>
      </div>
    </>
  );
}
