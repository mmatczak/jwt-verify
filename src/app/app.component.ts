import {Component} from '@angular/core';
import {KEYUTIL, KJUR} from 'jsrsasign';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sJWS = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.cC4hiUPoj9Eetdgtv3hF80EGrhuB__dzERat0XF9g2VtQgr9PJbu3XOiZj5RZmh7AAuHIm4Bh-0Qc_lF5YKt_O8W2Fp5jujGbds9uJdbF9CUAr7t1dnZcAcQjbKBYNX4BAynRFdiuB--f_nZLgrnbyTyWzO75vRK5h6xBArLIARNPvkSjtQBMHlb1L07Qe7K0GarZRmB_eSN9383LcOLn6_dO--xi12jzDwusC-eOkHWEsqtFZESc6BfI7noOPqvhJ1phCnvWh6IeYI2w9QOYEUipUTI8np6LbgGY9Fs98rqVt5AXLIhWkWywlVmtVrBp0igcN_IoypGlUPQGe77Rw';
  hN = 'a1f8160ae2e3c9b465ce8d2d656263362b927dbe29e1f02477fc1625cc90a136e38bd93497c5b6ea63dd7711e67c7429f956b0fb8a8f089adc4b69893cc1333f53edd019b87784252fec914fe4857769594bea4280d32c0f55bf62944f130396bc6e9bdf6ebdd2bda3678eeca0c668f701b38dbffb38c8342ce2fe6d27fade4a5a4874979dd4b9cf9adec4c75b05852c2c0f5ef8a5c1750392f944e8ed64c110c6b647609aa4783aeb9c6c9ad755313050638b83665c6f6f7a82a396702a1f641b82d3ebf2392219491fb686872c5716f50af8358d9a8b9d17c340728f7f87d89a18d8fcab67ad84590c2ecf759339363c07034d6f606f9e21e05456cae5e9a1';
  hE = '010001';

  resultToShow;

  headB64U;
  payloadB64U;
  sigvalB64U;
  si;
  sigvalH;
  headS;
  payloadS;

  verify() {
    const jws = new KJUR.jws.JWS();
    let result = 0;
    let pubKey;
    try {
      pubKey = KEYUTIL.getKey({n: this.hN, e: this.hE});
      jws.parseJWS(this.sJWS);
      result = KJUR.jws.JWS.verify(this.sJWS, pubKey, ['RS256']);
    } catch (ex) {
      result = 0;
    }
    this.resultToShow = result ? 'Valid' : 'Invalid';
    this.headB64U = jws.parsedJWS.headB64U;
    this.payloadB64U = jws.parsedJWS.payloadB64U;
    this.sigvalB64U = jws.parsedJWS.sigvalB64U;
    this.si = jws.parsedJWS.si;
    this.sigvalH = jws.parsedJWS.sigvalH;
    this.headS = jws.parsedJWS.headS;
    this.payloadS = jws.parsedJWS.payloadS;
  }
}
