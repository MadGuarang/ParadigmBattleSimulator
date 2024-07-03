<?php
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    $file = 'armies.js';
    $current = file_get_contents($file);
    $current .= "const " . $data['name'] . " = " . json_encode($data['army']) . ";\n";
    file_put_contents($file, $current);
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
