package ma.enset.studentsappspringangular.entites;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@ToString
@NoArgsConstructor @Builder
public class Payment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date datePayment;
    private Double amount;
    private PaymmentType type;
    private PaymmentStatus status;
    private String file;
    @ManyToOne
    private Student student;
}
