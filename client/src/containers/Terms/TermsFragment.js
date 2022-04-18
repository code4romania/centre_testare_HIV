import React from 'react';
import { Trans } from '@lingui/macro';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph, Text, Title } = Typography;

export const TermsFragment = () => {
  return (
    <div style={{ padding: '32px  0' }}>
      <Title level={3}>
        <Trans>1. Obiectivul Platformei</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Scopul proiectului Servicii din Norvegia pentru tinerii din România - PILOT este acela de
          a spori accesul tinerilor din categoria de vârstă 15-35 ani din zonele defavorizate la
          educație pentru sănătatea sexuală și a reproducerii după model norvegian, adoptând
          sloganul Active Citizens Fund România{' '}
          <Text strong>Lucrăm împreună pentru o Europă incluzivă</Text>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>2. Datele personale prelucrate</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Completând formularele puse la dispoziție în paginile platformei putem colecta următoarele
          date:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Adresa de e-mail</Trans>
        </li>
      </ul>
      <Title level={3}>
        <Trans>3. Scop și temei</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Asociația Semper Musica prelucrează datele entităților persoane juridice, publice sau
          private, doar în scopul de a le oferi informații privind distribuția în teren a centrelor
          HIV, a informațiilor relevante pentru testare și alte date utile persoanelor cu HIV.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>4. Durata stocării</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Datele furnizate sunt stocate temporar pe durata funcționării platformei{' '}
          <Link to="/">centrehiv.edreptultau.ro</Link>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>5. Transmiterea datelor către terți</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Datele pot fi transmise către alte instituții sau autorități publice, precum și alte
          organe abilitate ale statului, în baza și în limitele prevederilor legale, ca urmare a
          unor cereri expres formulate de acestea.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>6. Drepturile tale</Trans>
      </Title>
      <Paragraph>
        <Trans>
          În calitate de utilizator al platformei <Link to="/">centrehiv.edreptultau.ro</Link>,
          potrivit Legii nr. 679/2016, precum și, începând cu 25 mai 2018, potrivit Regulamentului
          General privind protecția datelor, ai următoarele drepturi:
        </Trans>
      </Paragraph>
      <ul>
        <li>
          <Trans>Dreptul la informare cu privire la prelucrarea datelor;</Trans>
        </li>
        <li>
          <Trans>
            Dreptul de acces la datele furnizate, la cerere și în mod gratuit pentru o solicitare pe
            an;
          </Trans>
        </li>
        <li>
          <Trans>
            Dreptul de intervenție, rectificarea, ștergerea sau portabilitatea datelor, la cerere și
            în mod gratuit;
          </Trans>
        </li>
        <li>
          <Trans>
            Dreptul de a te adresa Autorității Naționale de Supraveghere privind Prelucrarea Datelor
            cu Caracter Personal (cu sediul în Bucureşti, sector 1, B-dul G-ral. Gheorghe Magheru,{' '}
            <Link to={{ pathname: 'https://www.dataprotection.ro/' }} target="_blank">
              www.dataprotection.ro
            </Link>
            ) sau justiției, pentru apărarea oricăror drepturi garantate de lege;
          </Trans>
        </li>
        <li>
          <Trans>Dreptul la opoziţie şi procesul decizional individual automatizat;</Trans>
        </li>
        <li>
          <Trans>
            Începând cu 25 mai 2018, potrivit Regulamentului general privind protecția datelor,
            dreptul la restricționarea prelucrării.
          </Trans>
        </li>
      </ul>
      <Title level={3}>
        <Trans>7. Securitate și confidențialitate</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Protecția informațiilor în cursul prelucrării datelor colectate este o preocupare majoră a
          Asociației Semper Musica, de aceea toate datele colectate în cursul vizitelor pe{' '}
          <Link to="/">centrehiv.edreptultau.ro</Link> sunt prelucrate conform prevederilor legale
          în vigoare în România. Asociatia Semper Musica folosește tehnologii de ultimă generație și
          ia toate măsurile tehnice rezonabile pentru transmiterea și păstrarea datelor în condiții
          de deplină securitate și confidențialitate.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Toate datele de pe site sunt stocate și procesate pe servere situate în Uniunea Europeană,
          ce cad sub incidența legislației europene de protecție a datelor personale. Nicio
          informație oferită pe acest site nu părăsește teritoriul Uniunii Europene.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Dacă descoperim un incident cu privire la securitatea datelor care prezintă un risc pentru
          drepturile și libertățile utilizatorilor noștri, vom notifica Autoritatea Națională de
          Supraveghere privind Prelucrarea Datelor cu Caracter Personale în termen de 72 de ore.
          Dacă incidentul de securitate este de natură să prezinte un risc ridicat pentru drepturile
          și libertățile tale, vei fi, de asemenea, notificat.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Este strict interzisă folosirea acestui Site în scopul distrugerii sau alterării lui, a
          conținutului său, a securității acestuia ori pentru discreditarea sau hărțuirea{' '}
          <Link to="/">centrehiv.edreptultau.ro</Link> sau a Asociația Semper Musica.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Asociația Semper Musica va aplica toate măsurile de securitate tehnică și organizatorică
          pentru protejarea datelor asupra cărora deține controlul împotriva oricărei situații de
          manipulare accidentală sau intenționată, pierdere, distrugere sau împotriva accesului unei
          persoane neautorizate.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>8. Modificări Termeni și Condiții generale de utilizare Site</Trans>
      </Title>
      <Paragraph>
        <Trans>
          "Termenii și Condițiile generale de utilizare" constituie, în întregime, un acord încheiat
          între dumneavoastră și Asociația Semper Musica în privința utilizării
          <Link to="/">centrehiv.edreptultau.ro</Link>.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Semper Musica își rezervă dreptul de a revizui și aduce la zi "Termenii și Condițiile
          generale de utilizare" în orice moment, fără o anunțare sau o acceptare prealabilă a
          utilizatorilor.
        </Trans>
      </Paragraph>
      <Paragraph>
        <Trans>
          Dacă aveți întrebări cu privire la informațiile cuprinse în această pagină vă rugăm să ne
          scrieți la adresa <a href="mailto:office@sempermusica.org">office@sempermusica.org</a>.
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>9. Despre Semper Musica</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Asociația Semper Musica a apărut din nevoia de a fi martori la proiecte cu rezultate reale
          și palpabile, proiecte la care să contribuim pentru o schimbare în mai bine! Ne dorim
          schimbări rapide și de efect prin implicare comunitară. Când spunem implicare comunitară,
          ne referim atât la noi, cât și la tine. Nu avem cum să producem schimbări în mai bine fără
          ca toți să contribuim așa că, sperăm să te avem alături de noi pe drumul către schimbările
          pe care ni le dorim!
        </Trans>
      </Paragraph>
      <Title level={3}>
        <Trans>10. Contactează-ne</Trans>
      </Title>
      <Paragraph>
        <Trans>
          Pentru orice întrebări sau preocupări, precum și pentru exercitarea drepturilor tale
          legate de prelucrarea datelor de către Semper Musica, ne poți contacta la:
        </Trans>
      </Paragraph>
      <Paragraph>
        E-mail: <a href="office@sempermusica.org">office@sempermusica.org</a>
      </Paragraph>
    </div>
  );
};

export default { TermsFragment };
