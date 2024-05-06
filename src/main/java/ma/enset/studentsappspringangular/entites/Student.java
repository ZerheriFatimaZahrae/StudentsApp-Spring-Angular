package ma.enset.studentsappspringangular.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity @Data @Getter @Setter @AllArgsConstructor
@ToString
@NoArgsConstructor @Builder
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String code;
    private String programId;
    private String photo;

}
