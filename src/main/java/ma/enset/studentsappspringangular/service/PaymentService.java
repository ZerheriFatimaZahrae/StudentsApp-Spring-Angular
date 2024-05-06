package ma.enset.studentsappspringangular.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import ma.enset.studentsappspringangular.entites.Payment;
import ma.enset.studentsappspringangular.entites.PaymmentStatus;
import ma.enset.studentsappspringangular.entites.PaymmentType;
import ma.enset.studentsappspringangular.entites.Student;
import ma.enset.studentsappspringangular.repository.PaymentRepository;
import ma.enset.studentsappspringangular.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.UUID;

@Service @Transactional @AllArgsConstructor
public class PaymentService {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    public Payment savePayment (MultipartFile file, Date date,
                                double amount, PaymmentType type,
                                String studentCode) throws IOException {
        //le chemin au quel on va stocker nos fichiers
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String fileName = UUID.randomUUID().toString();
        //creer le file
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "payments", fileName + ".pdf");
        // file on va l enregistrer ds filePath
        Files.copy(file.getInputStream(), filePath);
        Student student = studentRepository.findByCode(studentCode);
        Payment payment = Payment.builder()
                .datePayment(date).type(type).student(student)
                .amount(amount)
                //convertir le path to string
                .file(filePath.toUri().toString())
                .status(PaymmentStatus.CREATED)
                .build();
        return paymentRepository.save(payment);
    }
    public byte[] getPaymentFile( Long paymentId) throws IOException {
        Payment payment = paymentRepository.findById(paymentId).get();
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
}
