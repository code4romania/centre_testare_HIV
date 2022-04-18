import React from 'react';
import { Trans } from '@lingui/macro';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const PolicyFragment = () => {
  return (
    <div style={{ padding: '32px 0' }}>
      <Title level={3}>
        <Trans>Ce este un "cookie"</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookie (“browser cookie“ sau “HTTP cookie“) este un fișier de mici dimensiuni, format din
          litere și numere, care este stocat pe orice terminal cu acces la internet (computer,
          telefon mobil, tabletă etc.) și este instalat prin solicitare emisă de către un web-server
          unui browser (ex: Internet Explorer, Chrome). De reținut: “Cookie“-urile nu conțin
          programe software, viruși sau spyware și nu pot accesa informațiile de pe hard drive-ul
          utilizatorului.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Un cookie este format din nume și conținut, durata de existență a acestuia fiind
          determinată, putând fi accesat din nou de webserver în momentul în care un utilizator se
          întoarce pe website-ul asociat webserverului respectiv.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Cookie-urile nu solicită informații cu caracter personal și nu identifică personal
          utilizatorii de internet.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Cookieuri de sesiune - acestea sunt stocate temporar în istoricul browser-ului care le
          memorează până când utilizatorul iese de pe web-siteul respectiv sau închide fereastra
          browserului.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Cookieuri Persistente - Acestea sunt stocate, în funcție de durata prestabilită, pe
          hard-drive-ul unui computer sau echipament. Cookie-urile persistente le includ și pe cele
          plasate de un alt website decât cel pe care îl vizitează utilizatorul la momentul
          respectiv - cunoscute sub numele de “third party cookies“ - care pot fi folosite în mod
          anonim pentru a memora interesele unui utilizator, astfel încât să fie livrată publicitate
          cât mai relevantă pentru utilizatori.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Care sunt avantajele cookie-urilor?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Un cookie conține informații care fac legătura între utilizatori și un anume website. Dacă
          un browser accesează acel web-server din nou, acesta poate citi informația deja stocată și
          reacționa în consecință.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Care este durata de viață a unui cookie?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Exista cookie-uri folosite exclusiv pentru o singură sesiune - acestea nu mai sunt
          reținute după ce utilizatorul iese de pe website. Cookie-uri permanente - sunt reținute și
          refolosite de fiecare dată când utilizatorul revine pe acel website, însă pot fi șterse
          oricând de utilizator.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Ce sunt cookie-urile plasate de terți?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Părți de conținut sau servicii pot fi plasate pe website-ul accesat, de către terțe părți
          prin intermediul bannerelor, boxurilor sau linkurilor - iar toate aceste instrumente pot
          conține cookie-uri. Ele se numesc “third party cookies“ pentru că nu sunt plasate de
          proprietarul website-ului respectiv, iar furnizorii terți se supun legilor îin vigoare și
          politicilor de confidențialitate ale deținătorului site-ului.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Cum sunt folosite cookie-urile de către acest site?</Trans>
      </Title>
      <Paragraph>
        <Trans>O vizită pe acest site poate plasa cookie-uri în scopuri de:</Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Cookie-uri pentru analiza vizitatorilor</Trans>
        </li>
        <li>
          <Trans>Cookie-uri de înregistrare</Trans>
        </li>
        <li>
          <Trans>Unele cookie-uri pot proveni de la terți.</Trans>
        </li>
      </ul>
      <Title level={3}>
        <Trans>Cookie-uri pentru analiza vizitatorilor</Trans>
      </Title>
      <Paragraph>
        <Trans>
          De fiecare dată când un utilizator vizitează acest site softul de analytics furnizat de o
          terță parte generează un cookie de analiză a utilizatorului. Acest cookie ne spune dacă
          ați mai vizitat acest site până acum. Browser-ul ne va spune dacă aveți acest cookie, iar
          dacă nu, vom genera unul. Acesta permite monitorizarea utilizatorilor unici care ne
          vizitează și cât de des o fac. Acest cookie nu poate fi folosit pentru a identifica
          persoanele fizice, ele sunt folosite doar în scop statistic.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Cookie-uri de înregistrare</Trans>
      </Title>
      <Paragraph>
        <Trans>
          La înregistrarea pe acest site, generăm un cookie cu datele dumneavoastră de înregistrare.
          Cookie-ul ne ajută în următorii pași pentru comunicarea cu serverul. Este posibil ca acest
          cookie să rămână pe dispozitivul dvs. dacă nu urmați toți pașii de înregistrare. Cu toate
          acestea, acest cookie va fi suprascris data viitoare când încercați să vă înregistrați pe
          acest site web.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Unele cookie-uri pot proveni de la terți</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Pe unele pagini, terții pot seta propriile cookie-uri anonime, în scopul de a urmări
          succesul unei aplicații, sau pentru a customiza o aplicație. Datorită modului de
          utilizare, acest site nu poate accesa aceste cookie-uri, la fel cum terțele părți nu pot
          accesa cookie-urile deținute de acest site. De exemplu, când distribuiți o pagină folosind
          butonul pentru rețelele sociale aflat pe acest site, acea rețea socială va înregistra
          activitatea dvs.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Ce tip de informații sunt stocate și accesate prin intermediul cookie-urilor?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookie-urile păstrează informații într-un fișier text de mici dimensiuni care permit unui
          website să recunoască un browser. Webserver-ul va recunoaște browserul până când cookie-ul
          expiră sau este șters. Cookie-ul stochează informații importante care îmbunătățesc
          experiența de navigare pe Internet (ex: un număr de ordine pentru donația ta).
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>De ce sunt cookie-urile importante pentru Internet?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookie-urile reprezintă punctul central al funcționării eficiente a Internetului, ajutând
          la generarea unei experiențe de navigare prietenoase și adaptată preferințelor și
          intereselor fiecărui utilizator. Refuzarea sau dezactivarea cookieurilor poate face unele
          site-uri imposibil de folosit.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Refuzarea sau dezactivarea cookie-urilor nu înseamnă că nu veți mai primi publicitate
          online - ci doar că aceasta nu va mai putea ține cont de preferințele și interesele dvs,
          evidențiate prin comportamentul de navigare.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Securitate și probleme legate de confidențialitate</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Cookie-urile NU sunt viruși! Ele folosesc formate tip plain text. Nu sunt alcătuite din
          bucăți de cod așa că nu pot fi executate nici nu pot auto-rula. În consecință, nu se pot
          duplica sau replica pe alte rețele pentru a se rula sau replica din nou. Deoarece nu pot
          îndeplini aceste funcții, nu pot fi considerate viruși.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Cookie-urile pot fi totuși folosite pentru scopuri negative. Deoarece stochează informații
          despre preferințele și istoricul de navigare al utilizatorilor, atât pe un anume site cât
          și pe mai multe alte siteuri, cookieurile pot fi folosite ca o formă de Spyware. Multe
          produse anti-spyware sunt conștiente de acest fapt și în mod constant marchează
          cookie-urile pentru a fi șterse în cadrul procedurilor de ștergere/scanare
          anti-virus/anti-spyware.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          În general browserele au integrate setari de confidențialitate care furnizează diferite
          nivele de acceptare a cookieurilor, perioada de valabilitate și ștergere automată dupa ce
          utilizatorul a vizitat un anumit site.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Alte aspecte de securitate legate de cookie-uri</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Deoarece protecția identității este foarte valoroasă și reprezintă dreptul fiecărui
          utilizator de internet, este indicat să se știe ce eventuale probleme pot crea
          cookieurile. Pentru că prin intermediul lor se transmit în mod constant în ambele sensuri
          informații între browser și website, dacă un atacator sau persoana neautorizată intervine
          în parcursul de transmitere a datelor, informațiile conținute de cookie pot fi
          interceptate. Deși foarte rar, acest lucru se poate întâmpla dacă browserul se conectează
          la server folosind o rețea necriptată (ex: o rețea WiFi nesecurizată).
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Alte atacuri bazate pe cookie implică setări greșite ale cookieurilor pe servere. Dacă un
          website nu solicită browserului să folosească doar canale criptate, atacatorii pot folosi
          această vulnerabilitate pentru a păcăli browserele în a trimite informații prin
          intermediul canalelor nesecurizate. Atacatorii utilizează apoi informațiile în scopuri de
          a accesa neautorizat anumite site-uri. Este foarte important să fiți atenți în alegerea
          metodei celei mai potrivite de protecție a informațiilor personale.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Sfaturi pentru o navigare sigură și responsabilă, bazată pe cookies</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Datorită flexibilitatii lor și a faptului ca majoritatea dintre cele mai vizitate site-uri
          și cele mai mari folosesc cookieuri, acestea sunt aproape inevitabile.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Dezactivarea cookie-urilor nu va permite accesul utilizatorului pe site-urile cele mai
          răspândite și utilizate printre care Youtube, Gmail, Yahoo și altele. Iată câteva sfaturi
          care vă pot asigura că navigați fără griji însă cu ajutorul cookie-urilor:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>
            Particularizați-vă setările browserului în ceea ce privește cookie-urile pentru a
            reflecta un nivel confortabil pentru voi al securității utilizării cookie-urilor. Dacă
            nu vă deranjează cookie-urile și sunteți singura persoană care utilizează computerul,
            puteți seta termene lungi de expirare pentru stocarea istoricului de navigare și al
            datelor personale de acces. Dacă împărțiți accesul la calculator, puteți lua în
            considerare setarea browserului pentru a șterge datele individuale de navigare de
            fiecare dată când închideți browserul. Aceasta este o variantă de a accesa site-urile
            care plasează cookie-uri și de a șterge orice informație de vizitare la închiderea
            sesiunii navigare.
          </Trans>
        </li>
        <li>
          <Trans>Instalați-vă și updatați-vă constant aplicații antispyware.</Trans>
        </li>
        <li>
          <Trans>
            Multe dintre aplicațiile de detectare și prevenire a spyware-ului includ detectarea
            atacurilor pe site-uri. Astfel, impiedică browserul de la a accesa website-uri care ar
            putea să exploateze vulnerabilitățile browserului sau să descarce software periculos.
            Asigurați-vă că aveți browserul mereu updatat. Multe dintre atacurile bazate pe cookies
            se realizează exploatând punctele slabe ale versiunilor vechi ale browserelor.
          </Trans>
        </li>
      </ul>
      <Paragraph>
        <Trans>
          Cookie-urile sunt pretutindeni și nu pot fi evitate dacă doriți să vă bucurați de acces pe
          cele mai bune și cele mai mari site-uri de pe Internet - locale sau internaționale. Cu o
          înțelegere clară a modului lor de operare și a beneficiilor pe care le aduc, puteți lua
          măsurile necesare de securitate astel încât să puteți naviga cu încredere pe internet.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>Cum pot opri cookie-urile?</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Dezactivarea și refuzul de a primi cookie-uri pot face anumite site-uri impracticabile sau
          dificil de vizitat și folosit. De asemenea, refuzul de a accepta cookie-uri nu înseamnă că
          nu veți mai primi/vedea publicitate online.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Este posibilă setarea din browser pentru ca aceste cookie-uri să nu mai fie acceptate sau
          poți seta browserul să accepte cookie-uri de la un site anume. Dar, de exemplu, dacă nu
          dorești să folosești cookie-urile nu poți să urmezi și pașii următori după înregistrarea
          completarea formularului.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Toate browserele moderne oferă posibilitatea de a schimba setarile cookie-urilor. Aceste
          setari se găsesc de regula în “opțiuni“ sau în meniul de “preferințe“ al browserului tău.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Pentru setarile cookie-urilor generate de terți, și pentru mai multe informații privind
          confidențialitatea legată de publicitatea online, IAB Romania pune la dispoziție următorul
          site:{' '}
          <Link to={{ pathname: 'http://www.youronlinechoices.com/ro/' }} target="_blank">
            http://www.youronlinechoices.com/ro/
          </Link>
        </Trans>
      </Paragraph>
    </div>
  );
};

export default PolicyFragment;