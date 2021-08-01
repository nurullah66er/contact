const name = document.getElementById('name');
const surname = document.getElementById('surname');
const mail = document.getElementById('mail');

const form = document.getElementById('form-contact');
const contactList = document.querySelector('.contact-list');

//event listenerlarin tanımlanması
form.addEventListener('submit',save);
contactList.addEventListener('click',kisiIslemleriniYap);


//tüm kisiler icin dizi
const tumKisilerDizisi = [];

function kisiIslemleriniYap(event) {
    console.log(event.target);
}

function save(e) {
    e.preventDefault();
    
    const eklenecekKisi = {
        name: name.value,
        surname: surname.value,
        mail:mail.value
    }

   const sonuc = verileriKontrolEt(eklenecekKisi)
   if (sonuc.durum){

       kisiyiEkle(eklenecekKisi);
      
   }
   else{
       bilgiOlustur(sonuc.mesaj,sonuc.durum);
       
   }

    //console.log(eklenecekKisi);
}

function verileriKontrolEt(kisi) {
    for(const deger in kisi) {
        if(kisi[deger]) {
            console.log(kisi[deger]);
        }
        else{
            const sonuc = {
                durum: false,
                mesaj: 'Boş alan bırakmayın'
            }
            return sonuc;
            
        }
    }
    alanlariTemizle();
    return {
        durum:true,
        mesaj:'Kaydedildi'
    }
}

function bilgiOlustur(mesaj,durum) {
    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent =mesaj;
    olusturulanBilgi.className = 'info';
  /*   if(durum) {
        olusturulanBilgi.classList.add('info--success')
    }
    else
    {
        olusturulanBilgi.classList.add('info--error')
    } */

    olusturulanBilgi.classList.add(durum ? 'info--success' : 'info--error' )

    document.querySelector('.container').insertBefore(olusturulanBilgi,form);

    ///setTimeOut, setInterval
    setTimeout(function (){
        const silinecekDiv = document.querySelector('.info');
        if (silinecekDiv) {
            silinecekDiv.remove();
        }
    },2000);

}

function alanlariTemizle() {
    name.value = '';
    surname.value = '';
    mail.value = '';
}

function kisiyiEkle(eklenecekKisi) {
    
    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = `<td>${eklenecekKisi.name}</td>
    <td>${eklenecekKisi.surname}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
        <button class="btn btn--edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn--delete"><i class="fas fa-user-minus"></i></button>
    </td>`

    contactList.appendChild(olusturulanTrElementi);
    
    tumKisilerDizisi.push(eklenecekKisi);

    console.log(tumKisilerDizisi);

    bilgiOlustur('Kişi Rehbere kaydedildi', true);
    
}