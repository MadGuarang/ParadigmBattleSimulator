<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = file_get_contents('php://input');
    file_put_contents('units.js', 'const units = ' . $data . ';');
    echo 'Units file updated successfully.';
} else {
    echo 'Invalid request method.';
}
?>
