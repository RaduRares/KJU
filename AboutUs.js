import React from 'react';
import './AboutUs.css'; // Presupunând că ai un fișier CSS separat

function AboutUs() {
  return (
    <div className="about-us">
      <h1>Despre Noi</h1>
      <p>
        A crea o pagină web este un proces care implică planificare, design, 
        dezvoltare și testare. Începem prin a înțelege nevoile și obiectivele 
        clienților noștri, urmat de schițarea unui wireframe care să ilustreze 
        structura de bază a paginii web. După aceasta, trecem la design-ul 
        vizual, unde alegem scheme de culori, fonturi și alte elemente 
        estetice. 
      </p>
      <p>
        Partea de dezvoltare implică scrierea codului efectiv, folosind 
        limbaje precum HTML, CSS, JavaScript și, adesea, biblioteci sau 
        framework-uri cum ar fi React. În acest stadiu, transformăm design-ul 
        într-o pagină web interactivă. Testarea este, de asemenea, un pas 
        crucial pentru a ne asigura că site-ul funcționează corect pe 
        diferite dispozitive și browsere. 
      </p>
      <p>
        Scopul nostru este să oferim utilizatorilor o experiență plăcută și 
        ușor de navigat, ceea ce contribuie la succesul general al site-ului web.
      </p>
    </div>
  );
}

export default AboutUs;
