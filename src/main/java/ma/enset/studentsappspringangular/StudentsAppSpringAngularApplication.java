package ma.enset.studentsappspringangular;

import ma.enset.studentsappspringangular.entites.Payment;
import ma.enset.studentsappspringangular.entites.PaymmentStatus;
import ma.enset.studentsappspringangular.entites.PaymmentType;
import ma.enset.studentsappspringangular.entites.Student;
import ma.enset.studentsappspringangular.repository.PaymentRepository;
import ma.enset.studentsappspringangular.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class StudentsAppSpringAngularApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentsAppSpringAngularApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                        PaymentRepository paymentRepository){
        return args -> {
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Fatima zahrae")
                            .lastName("ZERHERI")
                            .code("112233")
                            .programId("SDIA")
                            .build()

            );
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Abdelmoula")
                            .lastName("ZERHERI")
                            .code("112244")
                            .programId("GLSID")
                            .build()

            );
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Mohmed")
                            .lastName("Radi")
                            .code("112255")
                            .programId("SDIA")
                            .build()

            );
            studentRepository.save(
                    Student.builder()
                            .id(UUID.randomUUID().toString())
                            .firstName("Najat")
                            .lastName("Tijani")
                            .code("112266")
                            .programId("BDCC")
                            .build()

            );
            PaymmentType[] paymmentType= PaymmentType.values();
            PaymmentStatus[] paymmentStatuses=PaymmentStatus.values();
            Random random=new Random();
            studentRepository.findAll().forEach(st->{
                for (int i = 0; i < 10; i++) {
                    int index = random.nextInt(paymmentType.length);
                    int index2 = random.nextInt(paymmentStatuses.length);

                    Payment payment=Payment.builder()
                            .amount(1000+(Math.random()*20000))
                            .type(paymmentType[index])
                            .datePayment(new Date())
                            .status(paymmentStatuses[index2])
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });
        };
    }
}
