package ma.enset.studentsappspringangular.web;

import lombok.AllArgsConstructor;
import ma.enset.studentsappspringangular.entites.Payment;
import ma.enset.studentsappspringangular.entites.PaymmentStatus;
import ma.enset.studentsappspringangular.entites.PaymmentType;
import ma.enset.studentsappspringangular.entites.Student;
import ma.enset.studentsappspringangular.repository.PaymentRepository;
import ma.enset.studentsappspringangular.repository.StudentRepository;
import ma.enset.studentsappspringangular.service.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class PaymentRestController {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    private PaymentService service=new PaymentService(paymentRepository,studentRepository);
    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }
    @GetMapping(path = "/payments/{id}")
    public Payment getPayment(@PathVariable  Long id){
        return paymentRepository.findById(id).orElse(null);
    }
    @GetMapping(path = "/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }
    @GetMapping(path = "/students/{code}")
    public Student getStudent(@PathVariable String code){
        return studentRepository.findByCode(code);
    }
    @GetMapping(path ="/studentsByProgramId")
    public List<Student> getStudentByProgram(@RequestParam String programId){
        return studentRepository.findByProgramId(programId);
    }
    @GetMapping(path ="/students/{code}/payments")
    public List<Payment> getPaymentByStudent(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }

    @GetMapping(path ="/paymentsByStatus")
    public List<Payment> getPaymentsByStatus(@RequestParam PaymmentStatus status){
        return paymentRepository.findByStatus(status);
    }
    @GetMapping(path ="/paymentsByType")
    public List<Payment> getPaymentsByType(@RequestParam PaymmentType type){
        return paymentRepository.findByType(type);
    }
    @PutMapping("payments/{id}")//put:mise a jour
    public Payment updatePaymentStatus(PaymmentStatus status, @PathVariable Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    //conusmes pour annoncer qu il y ona plusieur type de donnees file , structure ..
    @PostMapping(value = "/payments",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment (MultipartFile file, Date date,
                                double amount, PaymmentType type,
                                String studentCode) throws IOException {
        return this.service.savePayment(file, date, amount, type, studentCode);
     }
    @GetMapping(path = "PaymentFile/{paymentId}",
    produces = MediaType.APPLICATION_PDF_VALUE)//consulter un file et  annoncer qu est un pdf
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return service.getPaymentFile(paymentId);
    }



}
