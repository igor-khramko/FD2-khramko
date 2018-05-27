function questionnaire() {
    do{
      var lastname = prompt('Enter your lastname');
    } while (!lastname || lastname.match(/[^a-z]/gi));
    do{
      var firstname = prompt('Enter your firstname');
    } while (!firstname || firstname.match(/[^a-z]/gi));
    do{
      var secondname = prompt('Enter your secondname');
    } while (!secondname || secondname.match(/[^a-z]/gi));
    do{
      var age = +prompt('Enter your age');
      var days = Math.floor(age*365);
    } while (!age || age<=0);
    var human = confirm('Your gender is male?');
    var gender = human ? "male" : "female";
    var r_age = human && age > 63 ? 'yes' 
              : !human && age > 58 ? 'yes' 
              : 'no';
    alert(
      `
      Full name: ${lastname} ${firstname} ${secondname}
      age, years: ${age} years
      age, days: ${days} days
      gender: ${gender}
      retirement age: ${r_age}`
    );
  }
  questionnaire();
  